import React, {Component, PropTypes} from 'react';
import RadioSet from '../RadioSet/RadioSet';

export default class CommentForm extends Component {
  constructor(props){
    super(props);
    this.state = {status: 'failed'};
  }

  _handleSubmit(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var comment = React.findDOMNode(this.refs.comment).value.trim();
    var status = this.state.status;
    // var comment = {
    //   name: React.findDOMNode(this.refs.name).value.trim(),
    //   comment: React.findDOMNode(this.refs.comment).value.trim(),
    //   status: this.state.status,
    //   time: Date.now()
    // };
    if (!name || !comment) {
      return;
    }
    this.props.onCommentSubmit({user: name, comment: comment, status: status});
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.comment).value = '';
  }

  _handleStatusChange(selected) {
    this.setState({status: selected});
  }
  render() {
    var radios = [
      {label: 'passed', value: 'passed'},
      {label: 'failed', value: 'failed'}
    ];
    return (
      <form className="form-horizontal" onSubmit={this._handleSubmit.bind(this)}>
        <div className="form-group">
          <input type="text" className="form-control" ref="name" id="name" placeholder="Identity Yourself" />
        </div>
        <div className="form-group">
          <textarea className="form-control" ref="comment" id="comment" placeholder="Add Comment" row="3" />
        </div>
        <div className="form-group">
          <RadioSet group="status" onChange={(selected) => this._handleStatusChange(selected)} radios={radios} selected={this.state.status} />
        </div>
        <button type='submit' className="btn btn-default">Submit</button>
      </form>
    );
  }
};
