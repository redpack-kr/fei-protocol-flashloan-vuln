if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

if [ -z ${ETH_MAINNET_RPC:-} ]; then
    echo "environments are invalid"
else
    if [ -z ${FORK_BLK_NUMBER:-} ]; then
        echo "creating a mainnet fork node ${ETH_MAINNET_RPC}"
        npx hardhat node --fork ${ETH_MAINNET_RPC} --no-deploy
    else
        echo "creating a mainnet fork node ${ETH_MAINNET_RPC}" with block number ${FORK_BLK_NUMBER}
        npx hardhat node --fork ${ETH_MAINNET_RPC} --fork-block-number ${FORK_BLK_NUMBER} --no-deploy
    fi
fi