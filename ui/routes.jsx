import React from 'react';
import {
  ReduxRouter,
  routerStateReducer,
  reduxReactRouter
} from 'redux-router';
import { Route, IndexRoute } from 'react-router';
import {
  App,
  Home,
  Navbar,
  ProjectContext,
  ProjectSummary,
  ProjectTrend,
  ProjectMatrix,
  TestRunList,
  TestRunDetail,
  TestRunDiff,
  NotFound,
} from './containers';

export default (store) => {
  return (
    <ReduxRouter>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="projects/:projectId" component={ProjectContext}>
          <IndexRoute component={ProjectSummary} />
          <Route path="summary" component={ProjectSummary} />
          <Route path="trend" component={ProjectTrend} />
          <Route path="matrix" component={ProjectMatrix} />
          <Route path="runs" component={TestRunList} />
          <Route path="runs/:runId" component={TestRunDetail} />
          <Route path="runs/diff/:id1/:id2" component={TestRunDiff} />
        </Route>
        <Route path="*" component={NotFound} status={404} />
      </Route>
    </ReduxRouter>
  );
}
