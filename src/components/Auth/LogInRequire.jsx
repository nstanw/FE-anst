import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class LogInRequire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <div>
        <Button
          color='danger'
          onClick={this.toggle}
        >
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>You are not loggin</ModalHeader>
          <ModalBody>
            <h1>You need loggin</h1>
          </ModalBody>
          <ModalFooter>
            <Button
              color='primary'
              onClick={this.toggle}
            >
              Do Something
            </Button>{' '}
            <Button
              color='secondary'
              onClick={this.toggle}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default LogInRequire;
