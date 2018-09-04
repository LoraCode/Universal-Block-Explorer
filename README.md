# Universal-Block-Explorer

API endpoints don’t exist for easy access to all of the data stored on-chain, more importantly, API endpoints also don’t exist for viewing the blockchain data in aggregate.
Ultimately it should be a visual representation of which crypto are being used the most.
For each asset, a fetch will be made for the last block every 1-600 seconds (depending on the median time of that particular asset's blockchain). A second call will shortly follow to grab that block's data. From that data, I'll be pulling the number of transactions from the corresponding array that represents all of the transactions inside of that block.

![alt text](https://github.com/LoraCode/Universal-Block-Explorer/blob/master/Images/Block-data.png)

## ERD

![alt text](https://github.com/LoraCode/Universal-Block-Explorer/blob/master/Images/Updated%20ERD.png?raw=true)

## Wireframes

![alt text](https://github.com/LoraCode/Universal-Block-Explorer/blob/master/Images/Wireframe%201.png?raw=true)
![alt text](https://github.com/LoraCode/Universal-Block-Explorer/blob/master/Images/Wireframe%202.png?raw=true)
![alt text](https://github.com/LoraCode/Universal-Block-Explorer/blob/master/Images/Wireframe%203.png?raw=true)
![alt text](https://github.com/LoraCode/Universal-Block-Explorer/blob/master/Images/Wireframe%204.png?raw=true)
