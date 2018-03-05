import React from 'react'
import ResetPasswordForm from '../components/registration/ResetPasswordForm'
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
    .create(<ResetPasswordForm/>).toJSON();
    expect(tree).toMatchSnapshot();
})