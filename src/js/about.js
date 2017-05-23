import React from 'react';

export default class About extends React.Component {
    constructor() {
        super();
        this.state = {
            name: 'luoxue'
        };
    }

    handLoadName(evt) {
        require.ensure([], (require) => {
            let moment = require('./c');
            console.log(moment);
        });
    }

    render() {
        return (
            <div onClick={this.handLoadName.bind(this)}>我们的故事</div>
        );
    }
}
