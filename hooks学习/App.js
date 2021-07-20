import React, { Component } from 'react'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import State from './pages/State'
import Effect from './pages/Effect'
import Context from './pages/Context'
import Reducer from './pages/Reducer'
import Ref from './pages/Ref'
import Memo from './pages/Memo'
import Callback from './pages/Callback'
import Drag from './pages/DragProject'

export default class App extends Component {
    render() {
        return (
            <div>
                <div className='wrapper'>
                    <NavLink className='navlink' to='state'>State</NavLink>
                    <NavLink className='navlink' to='effect'>effect</NavLink>
                    <NavLink className='navlink' to='Context'>Context</NavLink>
                    <NavLink className='navlink' to='Reducer'>Reducer</NavLink>
                    <NavLink className='navlink' to='Ref'>Ref</NavLink>
                    <NavLink className='navlink' to='Memo'>Memo</NavLink>
                    <NavLink className='navlink' to='Callback'>Callback</NavLink>
                    <NavLink className='navlink' to='Drag'>Drag</NavLink>
                </div>
                <div className='bottom-wrapper'>
                    <Switch>
                        <Route path='/state' component={State} />
                        <Route path='/effect' component={Effect} />
                        <Route path='/Context' component={Context} />
                        <Route path='/Reducer' component={Reducer} />
                        <Route path='/Ref' component={Ref} />
                        <Route path='/Memo' component={Memo} />
                        <Route path='/Callback' component={Callback} />
                        <Route path='/Drag' component={Drag} />
                        <Redirect to='/state' />
                    </Switch>
                </div>

                {/* <p>State</p>
                <State/>
                <br />
                <p>Effect</p>
                <Effect/>
                <br />
                <p>Context</p>
                <Context/>
                <br />
                <br />
                <p>Reducer</p>
                <Reducer/>
                <br />
                <p>Ref</p>
                <Ref/>
                <br />
                <p>Memo</p>
                <Memo/>
                <br />
                <p>Callback</p>
                <Callback/> */}
            </div>
        )
    }
}
