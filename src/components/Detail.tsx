import axios from 'axios'
import { FormEvent, useState } from 'react'
import { DataModel, Datas } from './models'



const Detail = ({ data, getData }: Datas) => {

  const [isLoading, setLoading] = useState(false);
  const [dataIndex, setdataIndex] = useState(0);


  const [inputVal1, setInputVal1] = useState({
    title: '',
    comment: ''
  } as DataModel);


  const getDataByIndex = (id: number) => {
    const dat = data.find((item, ind) => item.id === id);
    setInputVal1(dat as DataModel)
  }


  const removeItem = async (id: number | undefined, index: number) => {
    setdataIndex(index);
    setLoading(true);
    const response = await axios.delete(`http://localhost:8000/datas/${id}`);
    if (response.status === 200) {
      getData();
    }
    setLoading(false);
  }


  const handleChange1 = (e: any) => {
    const { name, value } = e.target;
    setInputVal1(prev => (
      { ...prev, [name]: value }
    ))

  }



  const updateItem = async (e: FormEvent, id: number) => {
    e.preventDefault();
    const response = await axios.patch(`http://localhost:8000/datas/${id}`, {
      title: inputVal1.title,
      comment: inputVal1.comment
    });

    if (response.status === 200) {
      getData();
    }
  }


  return (
    <>
      {data.map((dat, index) => {
        return <div className="card m-3 w-50" key={dat.id} >
          <div className="card-body">
            <h5 className="card-title">{dat.title}</h5>
            <h6 className="cardt-text">{dat.comment}</h6>
          </div>

          <div className="card-footer">
            <div className="d-flex justify-content-end">



              {/* @ts-ignore tabIndex */}
              <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div className="modal-dialog ">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel1">customize data</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form >

                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                          required
                          onChange={handleChange1}
                          value={inputVal1.title}
                          name="title"
                          type="text"
                          className="form-control" />

                        <label htmlFor="comment">Comment</label>
                        <input
                          onChange={handleChange1}
                          value={inputVal1.comment}
                          name="comment"
                          type="text"
                          className="form-control" />

                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button onClick={(e) => updateItem(e, inputVal1.id)}
                        data-bs-dismiss="modal"
                        type="button" className="btn btn-primary btn1">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>




              <button
                onClick={() => getDataByIndex(dat.id)}
                type="button" className="btn-primary me-2 px-4" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                Edit
              </button>





              {isLoading === true && dataIndex === index ? <div className="spinner-border" role="status"></div> : <button onClick={() => removeItem(dat.id, index)} className="btn-dark px-3">Remove</button>}

            </div>

          </div>

        </div>
      })}
    </>
  )
}

export default Detail
