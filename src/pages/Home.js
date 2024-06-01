/*
import React, { Component } from 'react';
import { Icon, Button, Dimmer, Loader, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import universies from '../ethereum/universies';
import web3 from '../ethereum/web3';
import DeliveryRow from '../components/DeliveryRow';

class Home extends Component {
    state = {
        loadingPage: true,
        loading: false,
        errorMessage: '',
        accounts: []
    };

    componentDidMount = async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            if(accounts.length !== 0){
                const senderDeliveriesCount = await universies.methods.owner(accounts[0]).call();
                const receiverDeliveriesCount = await universies.methods.owner(accounts[0]).call();
                
                const senderDeliveries = await Promise.all(
                    Array(parseInt(senderDeliveriesCount))
                      .fill()
                      .map((delivery, index) => {
                        return universies.methods.owner(accounts[0], index).call();
                      })
                  );
    
                  const receiverDeliveries = await Promise.all(
                    Array(parseInt(receiverDeliveriesCount))
                      .fill()
                      .map((delivery, index) => {
                        return universies.methods.owner(accounts[0], index).call();
                      })
                  );
                this.setState({ 
                    senderDeliveries: senderDeliveries, 
                    receiverDeliveries: receiverDeliveries,
                    accounts: accounts
                });
            }
        } finally {
            this.setState({ loadingPage: false })
        }
    }

    renderDeliveryRows(sent) {
        if(this.state.accounts.length !== 0 ){
            var deliveries;
            if (sent) {
                deliveries = this.state.senderDeliveries;
            } else {
                deliveries = this.state.receiverDeliveries;
            }
            return deliveries.map((delivery, index) => {
                return (
                    <DeliveryRow
                        key={index}
                        id={index}
                        delivery={delivery[index]}
                        sent={sent}
                    />
                );
            });
        }
    }

    render() {
        // Loading
        if (this.state.loadingPage) return (
            <div>
                <Segment style={{ height: '80vh' }}>
                    <Dimmer active inverted>
                        <Loader inverted content='Loading...' />
                    </Dimmer>
                </Segment>
            </div>
        );
      
        // Done
        return (
            <div>
                <h3><Icon name='sign in alternate' circular />&nbsp;Received deliveries</h3>
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Sender</Table.HeaderCell>
                            <Table.HeaderCell>Message</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderDeliveryRows(false)}</Table.Body>
                </Table>
                <h3><Icon name='sign out alternate' circular />&nbsp;Sent deliveries</h3>
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Receiver</Table.HeaderCell>
                            <Table.HeaderCell>Message</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderDeliveryRows(true)}</Table.Body>
                </Table>
                <Link to="/deliveries/new">
                    <Button
                        content = "Send New Delivery"
                        icon = "add circle"
                        primary = {true}
                        />
                </Link>
            </div>
        );
    }
}

export default Home;
*/