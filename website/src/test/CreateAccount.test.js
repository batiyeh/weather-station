import React from 'react'
import CreateUserForm from '../components/registration/createUserForm'
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
    .create(<CreateUserForm/>).toJSON();
    expect(tree).toMatchSnapshot();
})