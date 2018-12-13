import React from 'react'
import { storage } from '../firebase/index.jsx'

class Image extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            url: null
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    handleChange(e) {

        if (e.target.files[0]) {
            //console.log('kk',e.target.files[0])
            this.setState({
                image: e.target.files[0]
            })
        }
    }

    handleUpload(e) {
        const image = this.state.image;
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed', (snapshot) => {

        }, (error) => {
            console.log(error)
        }, () => {
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                console.log('url',url)
                this.setState({
                    url:url
                })
            })
        });
        
    }


    render() {
        return (
            <div>

                <h1>Hello world</h1>
                <h1>this is me</h1>
                <input type='file' onChange={this.handleChange} />
                <button onClick={this.handleUpload}>Upload Image</button>
                <img src={this.state.url} />

            </div>
        )
    }
}

export default Image