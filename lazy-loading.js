// https://reactjs.org/docs/code-splitting.html

// https://reactjs.org/docs/faq-internals.html


/*
Using dynamic import
When Webpack comes across this syntax, it automatically starts code-splitting your app.
*/
import("./math").then(math => {
  console.log(math.add(16, 26));
});

/*
React.lazy()

React.lazy takes a function that must call a dynamic import().
This must return a Promise which resolves to a module with a
default export containing a React component.

If the module containing the OtherComponent is not
yet loaded by the time MyComponent renders,
we must show some fallback content while we’re
waiting for it to load - such as a loading indicator.
This is done using the Suspense component.

If the other module fails to load (for example, due to network failure),
it will trigger an error. You can handle these errors to show a nice
user experience and manage recovery with Error Boundaries.
Once you’ve created your Error Boundary, you can use it
anywhere above your lazy components to display an error
state when there’s a network error.
*/

import MyErrorBoundary from './MyErrorBoundary';
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
      <MyErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
              <section>
                  <OtherComponent />
                  <AnotherComponent />
              </section>
          </Suspense>
      </MyErrorBoundary>
  </div>
);

/*
Route-based code splitting
*/
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
      <Suspense fallback={<div>Loading...</div>}>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
          </Switch>
      </Suspense>
  </Router>
);
