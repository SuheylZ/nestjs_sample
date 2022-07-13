
sudo mkdir -p /tmp/data/dgraph
sudo mkdir -p /tmp/data/mongo
sudo mkdir -p /tmp/data/portainer
sudo mkdir -p /tmp/data/mongoadm

sudo chmod 666 /tmp/data/dgraph
sudo chmod 666 /tmp/data/mongo
sudo chmod 666 /tmp/data/mongoadm
sudo chmod 666 /tmp/data/portainer


sudo docker-compose -f environment.yaml up -d
