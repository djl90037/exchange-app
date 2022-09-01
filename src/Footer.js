// Footer.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'

class Footer extends React.Component {
    render() {

        return (
            <React.Fragment>
    
                <footer className={this.props.data } >
                    <div className="mb-2">
                        <a className="badge badge-dark" href="https://github.com/djl90037/exchange-app" taget="_blank"><FontAwesomeIcon icon={faGithub} /></a>

                        <small><span className="mr-3">Built by <a href="https://melodic-daifuku-35d2cd.netlify.app/">Daniel Longfellow</a></span></small>
                    </div>
                </footer>
    
            </React.Fragment>
        )
    }
}

export default Footer