import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { charities } from 'reducers/charities'
import { ui } from 'reducers/ui'
import { users } from 'reducers/users'
import { About } from './pages/About'
import { CharityList } from './CharityList'
import { CharityDetail } from './CharityDetail'
import { Footer } from './components/Footer'
import { Login } from './pages/Login'
import { MyFavorites } from './pages/MyFavorites'
import { Navbar } from './Navbar'
import { OrganizationProjects } from './OrganizationProjects'
import { Registration } from './pages/Registration'
// import { SearchProjects } from './pages/SearchProjects'

const reducer = combineReducers({
  charities: charities.reducer,
  ui: ui.reducer,
  users: users.reducer
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
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/charities/:id" component={CharityDetail} />
          <Route exact path="/organization/:id" component={OrganizationProjects} />
          <Route exact path="/about" component={About} />
          <Route exact path="/myfavorites" component={MyFavorites} />

        </Switch>
        <Footer />
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