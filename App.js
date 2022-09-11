import React, { useState ,useEffect} from 'react';
import "./App.css";

const getLocalData =() =>{
  const lists = localStorage.getItem("mytodolist");

  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
  }
}

export const Todo = () => {
    const [inputData,setInputData] = useState(""); 
    const [items,setItem] = useState(getLocalData());
    const [isEditItem,setIsEditItem] = useState("");
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const addItem = () =>{
      if(!inputData)
      {
        alert("plz fill the data");
      }
      else if(inputData && !toggleSubmit) {
        setItem(
            items.map((elem) => {
                if (elem.id === isEditItem) {
                    return { ...elem, namee: inputData }
                }
                return elem;
            })
        )
        setToggleSubmit(true);

        setInputData('');

        setIsEditItem(null);
    } 
      else{
        const allinputData = { id: new Date().getTime().toString(), namee : inputData} 
        setItem([...items,allinputData]); 
        setInputData("");
      }
    }

    const deleteItem = (index) => {
      const updateItem = items.filter((elem) => {
        return index !== elem.id;
      })
      setItem(updateItem);
    }
    const removeAll= () =>{
      setItem([]);
    }
    const editItem = (index) =>{
      const item_todo_edited = items.find((curElem) =>{
        return curElem.id ===index;
      })
      setToggleSubmit(false);
      setInputData(item_todo_edited.namee); 
      setIsEditItem(index);
      
    }
    

    // adding to local storage
    useEffect(() => {
      localStorage.setItem("mytodolist",JSON.stringify(items));
    }, [items])

  return (
    <>
      <div className="main-div">
        <div className='child-div'>
          <figure>
            <img src="./to-do.png" alt="this is logo"/>
            <figcaption>
              Add your list here
            </figcaption>
          </figure>
          <div className='addItems'>
          <input type="text" placeholder="✍ Add Items..."
                           value={inputData} 
                           onChange={(e) => setInputData(e.target.value) }
                        />
            {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> :
                                  <i className="far fa-edit add-btn" title="Update Item" onClick={addItem}></i>
                        }  


            
          </div>
          {/*show our items*/}
              <div className='showItems'>
                {items.map((curElem)=>{
                  return( 
                    <div className='eachItem' key={curElem.id}>
                    <h3>{curElem.namee}</h3>
                    <div className='todo-btn'>
                      <i class="far fa-edit add-btn" onClick={()=> editItem(curElem.id)}></i>  
                      <i class="far fa-trash-alt add-btn" onClick={()=> deleteItem(curElem.id)}></i> 
                      
                    </div>
                  
                </div>

                  )
                })}
                
                
              </div>
          <div className='showItems'>
              <button className='btn effect04' data-sm-link-text= ' REmove all' onClick={removeAll}>
               <span>check list</span> 
              </button>
          </div>
          
        </div>
        
      </div>
    </>
  )
}
export default Todo;
