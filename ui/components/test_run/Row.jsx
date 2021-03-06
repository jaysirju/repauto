var React = require('react');
var Status = require('../common').Status;
var HoverToShow = require('../common').HoverToShow;
var TestRunConstants = require('../../constants/TestRun');
var Actions = require('../../actions/TestRunActions');
var Store = require('../../stores/TestRunStore').store;
var helper = require('../../helper');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var _ = require('lodash');

var Row = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function() {
    return {
      selected: false
    };
  },
  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    if (this.isMounted()) {
      this.setState({
        selected: Store.isSelected(this.props.id)
      });
    }
  },

  _handleClick: function(e) {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      Actions.select(this.props.id);
      this.setState({selected: Store.isSelected(this.props.id)});
    } else {
      window.location.href = Store.getById(this.props.id).url.detail;
    }
  },

  render: function() {
    var testRun = Store.getById(this.props.id);
    if (testRun.status != 'done') {
      var durationLabel = (
        <span className="label label-default">{testRun.status}</span>
      );
    }
    var status = testRun.report.original_status || 'cannot get status';
    var pr = helper.getPassRate(status);
    status.pr = pr + '%';
    var content = [
      <div key={_.uniqueId('start')} className="cell">
        <strong>{helper.showDateTime(testRun.start)}</strong>
      </div>,
      <div key={_.uniqueId('duration')} className="cell text-muted">
        {helper.showDuration(testRun.start, testRun.stop)}
      </div>,
      <div key={_.uniqueId('type')} className="cell"><strong>{testRun.type}</strong></div>,
    ];
    var trStatus = testRun.status;
    if (trStatus && trStatus != 'done') {
      content.push(
        <span key={_.uniqueId('trStatus')} className="label label-default">{trStatus}</span>
      );
    }
    if (testRun.report.todo > 0) {
      content.push(
        <span key={_.uniqueId('status')} className="badge">{testRun.report.todo}</span>
      );
    }
    content.push(
      <div key={_.uniqueId('status')} className="pull-right">
        <Status data={status} />
      </div>
    );
    var c = "list-group-item";
    if (this.state.selected) {
      c += " active"
    }
    return (
      <a href={testRun.url.detail} className={c} onClick={this._handleClick}>
        {content}
      </a>
    );
  }
});

module.exports = Row;
