[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<br />
<p align="center">

  <h3 align="center">Propchain</h3>

  <p align="center">
    A blockchain based Dapp for Property record keeping and location based verification
    <br />
    <a href="https://github.com/negishubham3503/Propchain"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/negishubham3503/Propchain">View Demo</a>
    ·
    <a href="https://github.com/negishubham3503/Propchain/issues">Report Bug</a>
    ·
    <a href="https://github.com/negishubham3503/Propchain/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

One of the great challenges in today's property business scenario is to curb the frauds that take place in our country. According to a recent statistical report, near about 1% of all the property ownership applications, deal with some kind of fraudulent activity. One of the common frauds is the duplicate/fake property papers and a hectic property details verification method.

One possible solution to the above problem is to come up with a way which provides property details in real time. The solution is centered around a blockchain based DApp which takes the GPS location data as input and shows the actual property details of that particular property in real-time. In this way, the fraudsters can be caught while they accompany the buyer to the property which they claim to sell. The property data is stored in a blockchain, so that it becomes near impossible to change the data, making it immutable and tamper-proof. 

A matter of concern here is the private details of other properties which may lead to a data breach if the app is misused in a way that a person can stand in any land area and get the details easily, no matter if that person has an interest in the property or not. This solution also consists of an authentication way by which a particular person will only be authorised once in a week to use the app and get details of the property. There can be other solutions as well, e.g. property dealer’s authentication and approval to get details, so the project can be extended with this feature.

More about the project can be seen in the project [report](https://drive.google.com/file/d/1uQ66GEkFcnvSDoXZwQAWYYcqk9xZKiiH/view?usp=sharing) and in the project [presentation](https://drive.google.com/file/d/1FoTG1eZI6B1kBz3LOJm0ypHmSaTgt3uh/view?usp=sharing)


### Built With

* [Bootstrap](https://getbootstrap.com)
* [Web3](https://web3js.readthedocs.io/en/v1.3.0/getting-started.html)
* [Truffle](https://www.trufflesuite.com/truffle)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* [Install](https://nodejs.org/en/) nodeJs
* npm
  ```sh
  npm install npm@latest -g
  ```
* truffle
  ```sh
  npm install truffle -g
  ```
* [Install](https://www.trufflesuite.com/ganache) ganache
* Get Mapbox API access token by creating free account [here](https://account.mapbox.com/auth/signup)


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/negishubham3503/Propchain.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```



<!-- USAGE EXAMPLES -->
## Usage

1. [Open Ganache and set up new workspace](https://www.trufflesuite.com/docs/ganache/quickstart)
2. [Link the project with ganache](https://www.trufflesuite.com/docs/ganache/truffle-projects/linking-a-truffle-project)
3. Migrate smart contracts
   ```sh
   truffle migrate
   ```
4. See the contract deployed in the contracts tab in Ganache and copy the PropertyVerificationByLocation contract's address
5. Paste the address in the src/app.js in the line
   ```sh
   var contract_address = "" //Replace the empty string with the copied address
   ```
6. Setup mapbox API by making below alteration in the src/app.js in the line
   ```sh
   mapboxgl.accessToken = "" //Replace the empty string with the mapbox API access token
   ```
7. Run tests
   ```sh
   truffle test
   ```
8. Start the server
   ```sh
   npm run dev
   ```


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/negishubham3503/Propchain/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Shubham Negi - coe17b030@iiitk.ac.in

Project Link: [https://github.com/negishubham3503/Propchain](https://github.com/negishubham3503/Propchain)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [Ganache](https://github.com/trufflesuite/ganache)
* [Mapbox](https://www.mapbox.com/)
* [lite-server](https://github.com/johnpapa/lite-server)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/negishubham3503/Propchain.svg?style=for-the-badge
[contributors-url]: https://github.com/negishubham3503/Propchain/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/negishubham3503/Propchain.svg?style=for-the-badge
[forks-url]: https://github.com/negishubham3503/Propchain/network/members
[stars-shield]: https://img.shields.io/github/stars/negishubham3503/Propchain.svg?style=for-the-badge
[stars-url]: https://github.com/negishubham3503/Propchain/stargazers
[issues-shield]: https://img.shields.io/github/issues/negishubham3503/Propchain.svg?style=for-the-badge
[issues-url]: https://github.com/negishubham3503/Propchain/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/negishubham3503/Propchain/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/-shubham-negi
[product-screenshot]: images/screenshot.png

