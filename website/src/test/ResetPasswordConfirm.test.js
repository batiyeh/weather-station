import React from 'react'
import ResetPasswordConfirmForm from '../components/registration/ResetPasswordConfirmForm'
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
    .create(<ResetPasswordConfirmForm/>).toJSON();
    expect(tree).toMatchSnapshot();
})