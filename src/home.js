import React from 'react'
import img from '../src/assets/todo_img.gif'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state =
    {
      message: "",
      status:false,
      search: "",
      array: []
    }
  }
  setValue = (event) => {
    this.setState(
      {
        message: event.target.value
      }
    )
  }
  adding = () => {
    if (this.state.message !== "") {
      this.setState(
        {
          ...this.state,
          status:true,
          message: "",
          array: [...this.state.array, this.state.message]
        }
      )
    }
    else {
      window.alert("please fill the above details")
    }

  }
  delete = (indices) => {

    let newarray = this.state.array;
    newarray.splice(indices, 1)
    this.setState(
      {
        array: newarray
      }
    )
    if(!this.state.array.length)
    {
      this.setState
      (
        {
          status:false
        }
      )

    }
    

  }
  edit = (items, indices) => {
    let items_edit = prompt(`enter the change`)
    let newarray = this.state.array;
    newarray.splice(indices, 1, items_edit);
    this.setState(
      {
        ...this.state,
        array: newarray
      }
    )

  }
  seach_input = (event) => {
    this.setState(

      {
        ...this.state,
        search: event.target.value
      }
    )
  }
  search_filter = () => {

   if(this.state.search != "")
   {
    let search_item = this.state.search;
    let newarray = this.state.array;
    let  result = newarray.filter(item=> item === search_item);
    console.log(result)
    if(result.length)
    {
      toast(`${search_item} is listed...`)
      
    }
    else
    {
      toast.error("not found")
    }
   }
   else
   {
    toast.error("can not procced with empty data")
   }
    
    ///working but printing i times in toast...
    // newarray.forEach((element) => {
    
    //   if (element !== search_item) {
        
    //     toast(`not found`)
          
    //   }
    //   else 
    //   {
    //     toast(`${element} is present  at `)
    //   }
    // });

  }
 
  render() {
    return (
      <>

        <section className="mt-5">
          <div className="container mt-5">
            <div className='row py-5'>
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header bg-dark text-white text-center">
                    <h2><span className="text-danger">ToDo</span>-List</h2>
                  </div>
                  <div className="card-body  py-5" >
                    <div class="input-group input-group-sm">
                      <input type="text" class="form-control" onChange={this.setValue} value={this.state.message} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                      <div class="input-group-append">
                        <button class="btn btn-primary" onClick={this.adding}>Add</button>
                      </div>
                    </div>
                  </div>
                  <div className=" card-footer  ">
                    
                     {
                       this.state.status ?
                       <>
                       <div id="fixed">
                       <h3 className="text-center text-dark pb-2">Your added to do list is :-</h3>
                       {
                         this.state.array.map((items, indices) => {
                           return (
                             <>
                               <div className="row ">
                                 <div className="col-md-8">
                                   <h5 className="mt-3">{`${indices + 1}) ${items} `}</h5>
                                 </div>
                                 <div className="col-md-2">
                                   <button className="btn btn-sm btn-info px-3" key={items} onClick={this.edit.bind(undefined, items, indices)}>Edit</button>
                                 </div>
                                 <div className="col-md-2">
                                   <button className="btn btn-danger btn-sm" key={indices} onClick={this.delete.bind(undefined, indices)}>Delete</button>
                                 </div>
                               </div>
                               <hr />
 
                             </>
                           )
                         })
                       }
                       </div>
                       </> :
                      <div id="fixed_hidden">
                         <img src={img}  height="100%" width="100%"/>
                      </div>
                     }
                    

                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h4>Search Your Task</h4>
                  </div>
                  <div className="card-body">
                    <div class="input-group input-group-sm">
                      <input type="text" class="form-control" value={this.state.search} onChange={this.seach_input} placeholder="Search Your Task Here" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                      <div class="input-group-append">
                        <button onClick={this.search_filter}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <ToastContainer />
      </>
    )
  }
}
export default Home
