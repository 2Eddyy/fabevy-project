import React, { useState, useEffect } from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import { Table, Pagination } from 'react-bootstrap';
import Swal from 'sweetalert2'

function Recuiter() {

  const [show, setShow] = useState(false);
  const [editshow, seteditShow] = useState(false);
  const [viewshow, setviewShow] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { register, reset, formState: { errors }, handleSubmit, control } = useForm();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    id: "",
    title: "",
    body:""
  })

  // back home button
  const BackButton = () => {
    navigate('/home')
  }

  // add opprotunities modal open 
  const AddRecuiter = () => {
    setShow(true)
  }

  // modal handle function
  const handleClose = (e) => {
    reset()
    setShow(false)
    seteditShow(false)
    setviewShow(false)
  };

  // create form function
  const onSubmit = (data) => {
    reset()
  }
  // Refresh list data
  const Refresh = () => {
    setFilterValue("")
    getAlldata();
  }
  // List function
  useEffect(() => {
    getAlldata()
  }, [])
  const getAlldata = () => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((result) => {
        setData(result)
        setLoading(false)
      })
  }
  // view data function
  const ViewData = (id) => {
    let result = data.find((item) => item.id === id)
    console.log(result);
    setviewShow(true)
    setFormData(result)
  }

  // edit function
  const EditData = (id) => {
    seteditShow(true)
    let result = data.find((item) => item.id === id)
    console.log(result);
    
  }

  // Delete function
  const DeleteData = (id) => {
    let result = data.find((item) => item.id === id)
    console.log(result);
    Swal.fire({
      title: 'Are you sure userId ' + result.id + ' ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  // bootstrapreact table data
  const ITEMS_PER_PAGE = 8;

  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterValue, setFilterValue] = useState('');

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  const filteredData = () => {
    return sortedData().filter(
      (item) =>
        item.id.toString().toLowerCase().includes(filterValue.toLowerCase()) ||
        item.userId.toString().toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  const totalPages = Math.ceil(filteredData().length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleData = filteredData().slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    setCurrentPage(1); // Reset to the first page when the filter changes
  };

  return (
    <div className='main-body '>
    <div className='sub-body container'>
      <div className='container mt-2'>
        <div className='row'>
          <div className='opp-header d-flex '>
            <div className='col-6 opp-search'>
              <input className='form-control' placeholder='Search by id or userid...' value={filterValue}
                onChange={handleFilterChange} />
            </div>
            <div className='col-6 header-btn d-flex '>
              <div className='add-btn'>
                <button onClick={AddRecuiter}>Add Recuiter</button>
              </div>
              <div className='back-btn'>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="my-tooltip">Back</Tooltip>}
                >
                  <button onClick={BackButton} ><ArrowCircleLeftIcon /></button>
                </OverlayTrigger>
              </div>

              <div className='refresh-btn' title='Refresh'>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="my-tooltip">Refresh</Tooltip>}
                >
                  <button onClick={Refresh}> <ReplayCircleFilledIcon /></button>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-2'>
        {isLoading && <div className='loading text-center '><span>Loading... </span><Spinner /></div>}
      </div>
      {filteredData().length === 0 ? (
        <div className="text-center mt-4"><h4>No Data Found...!</h4></div>
      ) : (
        <>
          <Table className="container mt-2 custom-table">
            <thead>
              <tr>
                <th>UserId</th>
                <th onClick={() => requestSort('id')}>Id</th>
                <th>Title</th>
                <th colSpan="3">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                visibleData.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.userId}</td>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td><button className='btn' onClick={() => ViewData(item.id)}>View</button></td>
                      <td><button className='btn' onClick={() => EditData(item.id)}>Edit</button></td>
                      <td><button className='btn' onClick={() => DeleteData(item.id)}>Delete</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          <div className='container pangination'>
            <Pagination>
              <Pagination.First
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </>
      )}

      {filteredData().length === 0 ? (
        <div className="text-center mt-4"></div>
      ) : (
        <>
          <div className='card-show'>
            {
              visibleData.map((item, i) => {
                return (
                  <div className='card mt-2 mb-2' key={i}>
                    <div className='text-center'>
                      <h4>UserId : {item.id}</h4>
                      <h4>Title : {item.title}</h4>
                    </div>
                    <div className='card-btn'>
                      <button className='btn' onClick={() => ViewData(item.id)}>View</button>
                      <button className='btn' onClick={() => EditData(item.id)}>Edit</button>
                      <button className='btn' onClick={() => DeleteData(item.id)}>Delete</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </>
      )}
    </div>
    {/* create modal form */}
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Recuiter</Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-body'>
        <form onSubmit={handleSubmit(onSubmit)} className='add-form' >
          <div className='container'>
            <div className='row'>
              <div className='col-6 mt-2'>
                <label>Company Name <span>*</span></label>
              </div>
              <div className='col-6 mt-2'>
                <input type='text' placeholder='Enter company name' className='form-control'
                  name='company'
                  {...register("company", { required: "Company name is required", })}
                />
                {errors.company && (<p className='text-danger'>{errors.company.message}</p>)}
              </div>
              <div className='col-6 mt-2'>
                <label>Recuiter Name <span>*</span></label>
              </div>
              <div className='col-6 mt-2'>
                <input type='text' placeholder='Enter recuiter name' className='form-control'
                  name='recuiter'
                  {...register("recuiter", { required: "Recuiter name is required", })}
                />
                {errors.recuiter && (<p className='text-danger'>{errors.recuiter.message}</p>)}
              </div>
              <div className='col-6 mt-2'>
                <label>Role <span>*</span></label>
              </div>
              <div className='col-6 mt-2'>
                <input type='text' placeholder='Enter role' className='form-control'
                  name='role'
                  {...register("role", { required: "Role is required", })}
                />
                {errors.role && (<p className='text-danger'>{errors.role.message}</p>)}
              </div>
              <div className='col-6 mt-2'>
                <label> Job Type <span>*</span> </label>
              </div>
              <div className='col-6 mt-2'>
                <Controller
                  name="job"
                  control={control}
                  rules={{ required: 'Please select jop type' }}
                  render={({ field }) => (
                    <Select placeholder="Select job type..."
                      {...field}
                      options={[
                        { value: 'Intenship', label: 'Intenship' },
                        { value: 'Full-Time', label: 'Full-Time' },
                        { value: 'Contract', label: 'Contract' }
                      ]}
                    />
                  )}
                />
                {errors.job && <p className='text-danger'>{errors.job.message}</p>}
              </div>
              <div className='col-6 mt-2'>
                <label> Qualification <span>*</span> </label>
              </div>
              <div className='col-6 mt-2'>
                <Controller
                  name="qualify"
                  control={control}
                  rules={{ required: 'Please select qualification' }}
                  render={({ field }) => (
                    <Select placeholder="Select qualification..."
                      {...field}
                      options={[
                        { value: 'BE', label: 'BE' },
                        { value: 'Arts', label: 'Arts' },
                        { value: 'Others', label: 'Others' }
                      ]}
                    />
                  )}
                />
                {errors.qualify && <p className='text-danger'>{errors.qualify.message}</p>}
              </div>
              <div className='col-6 mt-2'>
                <label>Status <span>*</span> </label>
              </div>
              <div className='col-6 mt-2'>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: 'Please select jStatus' }}
                  render={({ field }) => (
                    <Select placeholder="Select status..."
                      {...field}
                      options={[
                        { value: 'Intentify', label: 'Intentify' },
                        { value: 'Approched', label: 'Approched' },
                        { value: 'Colleteted', label: 'Colleteted' }
                      ]}
                    />
                  )}
                />
                {errors.status && <p className='text-danger'>{errors.status.message}</p>}
              </div>
              <div className='col-6 mt-2'>
                <label>Address</label>
              </div>
              <div className='col-6 mt-2'>
                <textarea className='form-control' placeholder='Enter company address'
                  name='address'
                  {...register("address", { required: "Company address is required", })}
                ></textarea>
                {errors.address && <p className='text-danger'>{errors.address.message}</p>}
              </div>
            </div>
          </div>
          <Modal.Footer className='mt-4'>
            <button className='btn' type='button' onClick={handleClose}>
              Close
            </button>
            <input type='submit' value="Submit" className='btn' />
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>

    {/* view modal form */}
    <Modal show={editshow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Recuiter</Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-body'>
        <form onSubmit={handleSubmit(onSubmit)} className='add-form' >
          <div className='container'>
            <div className='row'>
              <div className='col-6 mt-2'>
                <label>Company Name <span>*</span></label>
              </div>
              <div className='col-6 mt-2'>
                <input type='text' placeholder='Enter company name' className='form-control'
                  name='company'
                  {...register("company", { required: "Company name is required", })}
                />
                {errors.company && (<p className='text-danger'>{errors.company.message}</p>)}
              </div>
              <div className='col-6 mt-2'>
                <label>Recuiter Name <span>*</span></label>
              </div>
              <div className='col-6 mt-2'>
                <input type='text' placeholder='Enter recuiter name' className='form-control'
                  name='recuiter'
                  {...register("recuiter", { required: "Recuiter name is required", })}
                />
                {errors.recuiter && (<p className='text-danger'>{errors.recuiter.message}</p>)}
              </div>
              <div className='col-6 mt-2'>
                <label>Role <span>*</span></label>
              </div>
              <div className='col-6 mt-2'>
                <input type='text' placeholder='Enter role' className='form-control'
                  name='role'
                  {...register("role", { required: "Role is required", })}
                />
                {errors.role && (<p className='text-danger'>{errors.role.message}</p>)}
              </div>
              <div className='col-6 mt-2'>
                <label> Job Type <span>*</span> </label>
              </div>
              <div className='col-6 mt-2'>
                <Controller
                  name="job"
                  control={control}
                  rules={{ required: 'Please select jop type' }}
                  render={({ field }) => (
                    <Select placeholder="Select job type..."
                      {...field}
                      options={[
                        { value: 'Intenship', label: 'Intenship' },
                        { value: 'Full-Time', label: 'Full-Time' },
                        { value: 'Contract', label: 'Contract' }
                      ]}
                    />
                  )}
                />
                {errors.job && <p className='text-danger'>{errors.job.message}</p>}
              </div>
              <div className='col-6 mt-2'>
                <label> Qualification <span>*</span> </label>
              </div>
              <div className='col-6 mt-2'>
                <Controller
                  name="qualify"
                  control={control}
                  rules={{ required: 'Please select qualification' }}
                  render={({ field }) => (
                    <Select placeholder="Select qualification..."
                      {...field}
                      options={[
                        { value: 'BE', label: 'BE' },
                        { value: 'Arts', label: 'Arts' },
                        { value: 'Others', label: 'Others' }
                      ]}
                    />
                  )}
                />
                {errors.qualify && <p className='text-danger'>{errors.qualify.message}</p>}
              </div>
              <div className='col-6 mt-2'>
                <label>Status <span>*</span> </label>
              </div>
              <div className='col-6 mt-2'>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: 'Please select jStatus' }}
                  render={({ field }) => (
                    <Select placeholder="Select status..."
                      {...field}
                      options={[
                        { value: 'Intentify', label: 'Intentify' },
                        { value: 'Approched', label: 'Approched' },
                        { value: 'Colleteted', label: 'Colleteted' }
                      ]}
                    />
                  )}
                />
                {errors.status && <p className='text-danger'>{errors.status.message}</p>}
              </div>
              <div className='col-6 mt-2'>
                <label>Address</label>
              </div>
              <div className='col-6 mt-2'>
                <textarea className='form-control' placeholder='Enter company address'
                  name='address'
                  {...register("address", { required: "Company address is required", })}
                ></textarea>
                {errors.address && <p className='text-danger'>{errors.address.message}</p>}
              </div>
            </div>
          </div>
          <Modal.Footer className='mt-4'>
            <button className='btn' type='button' onClick={handleClose}>
              Close
            </button>
            <input type='submit' value="Submit" className='btn' />
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>

    {/* view single data details */}
    <Modal show={viewshow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Recuiter Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className='view-body'>
        <div className='container'>
          <div className='row'>
            <div className='col-6 fw-bold' >
              <label>UserId </label>
            </div>
            <div className='col-6'>
              <p>{formData.userId}</p>
            </div>
            <div className='col-6 fw-bold'>
              <label>Id  </label>
            </div>
            <div className='col-6'>
              <p>{formData.id}</p>
            </div>
            <div className='col-6 fw-bold'>
              <label>Title  </label>
            </div>
            <div className='col-6'>
              <p>{formData.title}</p>
            </div>
            <div className='col-6 fw-bold'>
              <label>Body  </label>
            </div>
            <div className='col-6'>
              <p>{formData.body}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  </div>
  )
}

export default Recuiter