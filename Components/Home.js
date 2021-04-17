import React from 'react'
import 'dayjs/locale/fr'
class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rdvs:[]
        }
    }

    componentDidMount() {
        this._hydrateCalendar();
    }

    componentWillUnmount() {
    }
}

export default Home