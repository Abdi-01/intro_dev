import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { API } from '../helper';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            album: []
        }
    }

    componentDidMount() {
        this.getDataAlbum()
    }

    getDataAlbum = () => {
        axios.get(API + '/album')
            .then(res => {
                console.log(res.data)
                this.setState({ album: res.data })
            }).catch(err => {
                console.log(err)
            })
    }

    onBtAdd = () => {
        let { iduser } = this.props
        if (iduser) {
            if (this.inputTitle.value == "" || this.inputDescription.value == "" || this.inputImage.value == "") {
                alert("Isi seluruh form ⛔")
            } else {
                axios.post(API + `/album`, {
                    title: this.inputTitle.value,
                    description: this.inputDescription.value,
                    image: this.inputImage.value
                }).then(res => {
                    alert("Upload image success ✅")
                    this.getDataAlbum()
                }).catch(err => {
                    console.log(err)
                })
            }
        } else {
            alert("Silahkan login terlebih dahulu ⛔")
        }
    }

    // fungsi untuk menampilkan gambar
    printAlbum = () => {
        return this.state.album.map((value, index) => {
            return (
                <div className="col-sm-6 col-md-4 p-3">
                    <div className="card">
                        <img src={value.image} style={{ objectFit: 'cover', height: '30vh', width: '100%' }} alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{value.title}</h5>
                            <p className="card-text" style={{overflow:'hidden',textOverflow:'ellipsis', minHeight:'5vh',maxHeight:'5vh'}}>{value.description}</p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div style={{ backgroundColor: '#F8F9FA' }}>
                <div className="jumbotron mb-2 row" style={{ backgroundColor: 'white' }}>
                    <div className="col-md-6">
                        <div style={{ width: '90%' }} className="m-auto">
                            <h1 className="display-4">Album Example</h1>
                            <p className="lead">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet,
                        but not too short so folks don’t simply skip over it entirely.</p>
                            <button className="btn btn-primary btn-lg">Your Album</button><button className="btn btn-secondary btn-lg">Their Album</button>
                        </div>
                    </div>
                    <di className="col-md-3">
                        <img id="imgpreview" width="100%" />
                    </di>
                    <div className="col-md-3 p-4 bg-dark text-white text-left">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" ref={elemen => this.inputTitle = elemen} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea type="textarea" className="form-control" id="description" aria-describedby="emailHelp" ref={elemen => this.inputDescription = elemen} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="img">Image</label>
                                <input type="text" className="form-control" id="img" aria-describedby="emailHelp" ref={elemen => this.inputImage = elemen} />
                            </div>
                        </form>
                        <button type="button" className="btn btn-primary float-right" onClick={this.onBtAdd}>Add Data</button>
                    </div>
                </div>
                <div className="row container m-auto">
                    {/* tempat menampilkan gambar album */}
                    {this.printAlbum()}
                </div>
            </div>
        );
    }
}

const mapToProps = ({ userReducer }) => {
    return {
        iduser: userReducer.id
    }

}

export default connect(mapToProps)(LandingPage);