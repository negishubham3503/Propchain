const PropertyVerificationByLocation = artifacts.require("PropertyVerificationByLocation");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('PropertyVerificationByLocation', function([authority, verifier]){
    let propertyVerification;

    before(async () => {
        propertyVerification = await PropertyVerificationByLocation.deployed()
    })
    
    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await propertyVerification.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })

    describe("Property Verification", async () => {
        let resultAddition;
        let foundResult;
        let falseResult;

        before(async () => {
            resultAddition = await propertyVerification.addPropertyRecord("Vivek", [30365532, 30365402, 30365315, 30365448], [78047383, 78047584, 78047509, 78047307], "Corporate");
        })

        it('adds Property record', async() => {
            assert.notEqual(resultAddition, null || undefined);
            const event = resultAddition.logs[0].args;
            assert.equal(event.propertyDatabaseLength, 1, "Property is added to databse record");
            assert.equal(event.name, "Vivek", "Name is correct");
        })

        before(async () => {
            foundResult = await propertyVerification.getPropertyRecord(30365437, 78047438);
            falseResult = await propertyVerification.getPropertyRecord(57890909, 45674747);
        })

        it('gets valid property record', async() => {
            assert.equal(foundResult[2], "Vivek", "name is found succesfully");
            assert.equal(falseResult[2], "Property is not in the records", "false result is working fine");
            assert.equal(falseResult[0], 404, "false result is working fine");
        })
    })
});