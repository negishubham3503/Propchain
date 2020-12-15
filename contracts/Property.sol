// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0;
pragma experimental ABIEncoderV2;

contract PropertyVerificationByLocation {
    struct Owner {
        string name;
        address account;
        string ownershipType;
    }
    struct Property {
        uint id;
        Owner propertyOwner;
        int[4] latitudes;
        int[4] longitudes;
    }

    event RecordAdded(
        uint propertyDatabaseLength,
        string name,
        string ownerType
    );

    event RecordFound(
        uint id,
        string name
    );

    Property[] private propertyRecords;

    function areaOfTriangle(int point1x, int point1y, int point2x, int point2y, int point3x, int point3y) private pure returns (int) {
        int area = (point1x-point3x)*(point2y-point1y)-(point1x-point2x)*(point3y-point1y);
        if (area < 0) {
            area = area * (-1);
        }
        area = area / 2;
        return area;
    }

    function areaOfQuadrilateral(int[4] memory xarray, int[4] memory yarray) private pure returns (int) {
        int halfArea1 = (xarray[0]-xarray[2])*(yarray[1]-yarray[0])-(xarray[0]-xarray[1])*(yarray[2]-yarray[0]);
        if (halfArea1 < 0) {
            halfArea1 = halfArea1 * (-1);
        }
        int halfArea2 = (xarray[0]-xarray[2])*(yarray[3]-yarray[0])-(xarray[0]-xarray[3])*(yarray[2]-yarray[0]);
        if (halfArea2 < 0) {
            halfArea2 = halfArea2 * (-1);
        }
        int area = (halfArea1+halfArea2)/2;
        return area;
    }

    function ifLocationInsidePropertyBoundary(int[4] memory _latitudes, int[4] memory _longitudes, int _lat, int _lng) pure private returns(bool) {
        int area1 = areaOfTriangle(_latitudes[0], _longitudes[0], _latitudes[1], _longitudes[1], _lat, _lng);
        int area2 = areaOfTriangle(_latitudes[1], _longitudes[1], _latitudes[2], _longitudes[2], _lat, _lng);
        int area3 = areaOfTriangle(_latitudes[2], _longitudes[2], _latitudes[3], _longitudes[3], _lat, _lng);
        int area4 = areaOfTriangle(_latitudes[3], _longitudes[3], _latitudes[0], _longitudes[0], _lat, _lng);
        int areaOfTriangles = area1 + area2 + area3 + area4;

        int areaOfQuad = areaOfQuadrilateral(_latitudes, _longitudes);

        if (areaOfTriangles > areaOfQuad) {
            return false;
        } else {
            return true;
        }
    }

    function getPropertyRecord(int lat, int lng) public returns(uint, address, string memory) {
        for (uint i = 0; i < propertyRecords.length; i++) {
            if (ifLocationInsidePropertyBoundary(propertyRecords[i].latitudes, propertyRecords[i].longitudes, lat, lng)) {
                emit RecordFound(propertyRecords[i].id, propertyRecords[i].propertyOwner.name);
                return (propertyRecords[i].id, propertyRecords[i].propertyOwner.account, propertyRecords[i].propertyOwner.name);
            }
        }
        emit RecordFound(404, "Property is not in the records");
        return (404, msg.sender, "Property is not in the records");
    }

    function addPropertyRecord(string memory ownerName, int[4] memory xCoordinates, int[4] memory yCoordinates, string memory _ownershipType) public returns(uint) {
        //put msg.sender instead of owners address
        require(bytes(ownerName).length > 0);

        Property memory newProperty;
        uint index = propertyRecords.length;

        newProperty.propertyOwner.name = ownerName;
        newProperty.propertyOwner.account = msg.sender;
        newProperty.propertyOwner.ownershipType = _ownershipType;
        newProperty.id = block.timestamp + propertyRecords.length;

        for (uint i = 0; i < 4; i++) {
            newProperty.latitudes[i] = xCoordinates[i];
            newProperty.longitudes[i] = yCoordinates[i];
        }

        propertyRecords.push(newProperty);
        emit RecordAdded(propertyRecords.length, propertyRecords[index].propertyOwner.name, propertyRecords[index].propertyOwner.ownershipType);
        return(newProperty.id);
    }
}

// 30.365532, 78.047383
// 30.365402, 78.047584
// 30.365315, 78.047509
// 30.365448, 78.047307

// 30.365437, 78.047438
