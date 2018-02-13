import React, { Component } from 'react';


class CreateComp extends Component {

    constructor() {
        super();
        this.grabInfo = this.grabInfo.bind(this);
    }
    grabInfo(e){
        e.preventDefault();
        const data = new FormData(e.target);

        fetch('/api/create', {
            method: 'POST',
            body: data,
        });
    }

    render(){
        return(
            <div className = 'container'>  
            <form id='createForm' onSubmit={this.grabInfo}>
              <div className='login-info mb-3'>
                <div className='form-group'>
                  <input id='username' name='username' type='text' className='form-control' placeholder='Username'/>
                </div>
                <div className='form-group'>
                  <input id='email' name='email' type='email' className='form-control' placeholder='Email' aria-label='Email'/>
                </div>
                <div className='form-group'>
                  <input id='password' name='password' type='password' className='form-control' placeholder='Password' aria-label='Password'/>
                </div>
              </div>
              <div className='row'>
                <div className='col-6'>
                  {/* put return to login link here */}
                </div>
                <div className='col-6'>
                  <button className="btn btn-default">Create Account</button>
                </div>
              </div>
            </form>
        </div>
        )
    }
}

export default CreateComp;