import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import '../App.scss';
import { map } from 'lodash';
import routers from './routes';

console.log(routers);

export function Navigation() {
  return (
    <>    
        <Router>
            <Routes>
              {/* <Route path="/" element={<button className="ui button">Click Here</button>} /> */}
              {/* <Route path="/" element={<h1>hola como estan</h1>} /> */}
              {map(routers, (route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  element={
                    <route.layout>
                      <route.component />
                    </route.layout>
                  }              
                />
              ))}
            </Routes>
        </Router>
    </>
  )
}

