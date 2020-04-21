import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { charities } from 'reducers/charities'
import { CharityList } from './CharityList'
import { CharityDetail } from './CharityDetail'
import { ChildrenProjects } from './ChildrenProjects'
import { FeaturedProjects } from './FeaturedProjects'
import { Navbar } from './Navbar'
import { OrganizationProjects } from './OrganizationProjects'

const reducer = combineReducers({
  charities: charities.reducer
})

const store = configureStore({ reducer })


export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Route path="/" exact>
          <CharityList />
        </Route>
        <Switch>
          <Route exact path="/charities/:id" component={CharityDetail} />
          <Route exact path="/children" component={ChildrenProjects} />
          <Route exact path="/featured" component={FeaturedProjects} />
          <Route exact path="/organization/:id" component={OrganizationProjects} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}


// export const App = () => {
//   return (
//     <BrowserRouter>
//       <main>
//       <Switch>
//         <Route path="/" exact>
//           <CharityList />
//         </Route>
//         <Route path="/charities/:id">
//           <CharityDetail />
//         </Route>
//       </Switch>
//       </main>
//     </BrowserRouter>
//   )
// }

// export const App = () => {
//   return (
//     <div>
//       <CharityList />
//     </div>
//   )
// }