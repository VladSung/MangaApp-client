'use client'

const ErrorC = ({ error }: { error: Error }) => {

    return (<div>{error.name}: {error.message} \n {error.stack}</div>)
}

export default ErrorC;
