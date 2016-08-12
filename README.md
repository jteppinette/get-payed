# Get Payed - *a bitcoin-acceptance service with user accounts*

## Getting Started

1. [Install a bitcore node onto your computer.](https://bitcore.io/guides/full-node) This can take several hours to sync with the testnet blockchain.

2. Clone this repo onto your filesystem.
    * `git clone git@github.com:jteppinette/get-payed.git`

3. Assuming the created Bitcore node is called `mynode` and resides in your home directory, Symlink `get-payed` into the `node_modules` directory of `~/mynode`.
    * `ln -s ~/mynode/node_modules ~/get-payed`

4. Add `get-payed` as a dependency in `~/mynode/bitcore-node.json`:

```json
{
  "datadir": "./data",
  "network": "testnet",
  "port": 3001,
  "services": [
    "bitcoind",
    "db",
    "address",
    "web",
    "get-payed"
  ]
}
```

5. Install the `get-payed` node packages:
    * `npm install`

6. Install the `get-payed` bower packages:
    * `npm run bower-install`

7. Build the public assets:
    * `npm run watch`

6. Start your bitcore-node from within the `~/mynode` directory:
    * `cd ~/mynode`
    * `bitcored`

7.  Visit `localhost:3001/get-payed/`
