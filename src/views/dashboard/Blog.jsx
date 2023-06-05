import React, { useEffect, useState, useRef  } from 'react'
import { axiosPrivate } from '../../util/request'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CRow,
    CModal,
    CModalHeader,
    CModalBody,
    CModalTitle,
    CModalFooter,
    CCardFooter,
    CForm,
    CFormInput,
    CFormTextarea,
    CAlert,
    CToast,
    CToastBody,
    CToastClose,
    CToaster,
    CToastHeader,
    CFormLabel

  } from '@coreui/react'
import Table from '../../components/Table'
import { useSelector,useDispatch } from 'react-redux'
import { getBlogPosts, getSingleBlogPosts } from '../../app/blogSlice'

import { useParams,Link, useLocation ,useMatch, useNavigate } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react';
import { addBlogPost } from './../../app/blogSlice';

const Blog = () => {
    const dispatch = useDispatch();
    const { posts, singlePost,addStatus } = useSelector((state)=>state.blog)

    const [filteredBlog,setfilteredBlog] = useState();
    const [visible, setVisible] = useState(false)
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate();
    const match = useMatch(`/blog/:id/edit`);
    const AddPost = useMatch(`/blog/add`);
    const toaster = useRef()

    const [list,setList] = useState(true);
    const [view,setView] = useState(false);
    const [edit,setEdit] = useState(false)
    const [add,setAdd] = useState(false)
    
    // edit and add forms
    const [title,settitle] = useState('')
    const [subtitle,setSubtitle] = useState('')
    const [postbody,setpostbody] = useState('')
    const [postimage,setpostimage] = useState('')
    const [postimageuri,setpostimageuri] = useState('')
    const editorRef = useRef(null);

    const [toast, addToast] = useState(0)


    useEffect(()=>{
        console.log('blog');
        dispatch(getBlogPosts())
        // GetallBlogPost();
    },[])

    useEffect(()=>{
        console.log(location.pathname);
        console.log('urlmatch',match)

        if(id !== undefined){
          dispatch(getSingleBlogPosts(id));
          setView(true);
          setList(false);
          setEdit(false);
          setAdd(false)
        }
        if(location.pathname === match?.pathname){
            
            setEdit(true);
            setView(false);
            setList(false);
            setAdd(false);

            settitle(singlePost.title)
            setSubtitle(singlePost.subtitle)
            setpostbody(singlePost.body)
        }
        if(AddPost){
            setAdd(true)
            setView(false);
            setList(false);
            setEdit(false);
            settitle('')
            setSubtitle('')
            setpostbody('')
        }

      },[ match , location, id,AddPost])

    useEffect(()=>{
        console.log(postbody);
      },[postbody])

      useEffect(()=>{
        const data = posts?.map((item)=>{
          return {
              'id':item.id,
              'title':item.title,
              'author':item.author,
              'dateCreated':item.date_created,
              'published':item.published,
              'tags':item.tags,
              'views':item.views,
              'action':item.id,
          }
        })

        console.log(data)
      setfilteredBlog(data)
      },[posts])
    
    //   const GetallBlogPost = async ()=>{
    //     const prod = await axiosPrivate.get('/blog');
    //     console.log(prod.data);
    //   }
      const handleSubmit = (e)=>{
        e.preventDefault();
        // setpostbody(e.target)
        const payload = {
          "title":title ,
          "subtitle": subtitle,
          "body":postbody
        }

        console.log('Edit New',payload);
      }

      const handlePostSubmit = async (e)=>{
        e.preventDefault();
        setpostbody(editorRef.current.getContent());

        const payload = await {
          title:title ,
          subtitle: subtitle,
          body: postbody,
          author:'admin',
          views:0,
          likes : 0,
          dislikes : 0,
          hidden : 0,
          fav : 0,
          new: 0,
          published:0,
          image:''
        }
        dispatch(addBlogPost(payload))
        if(addStatus){
          addToast(exampleToast);
          setTimeout(()=>{
            navigate('/blog');
          },5000)
        }
        console.log('Add New', payload);
      }

      const handleFileChange=(event) =>{

        let files = event.target.files;
        setpostimageuri(files)
        let reader = new FileReader();

        reader.readAsDataURL(files[0]);
 
        reader.onload = (e) => {
            setpostimage(e.target.result)
        }
        console.log(postimage)
      }
      const columns = [
              { col:'title' },
              { col:'author' },
              { col:'date created' },
              { col:'published' },
              { col:'tags' },
              { col:'views' },
              { col:'action' }
      ]

      const exampleToast = (
        <CToast autohide={false} visible={true} color="primary" className="text-white align-items-center">
          <div className="d-flex">
            <CToastBody>Hello, world! This is a toast message.</CToastBody>
            <CToastClose className="me-2 m-auto" white />
          </div>
        </CToast>
      )

  return (
    <>
        {/* <CAlert color="success">A simple success alert—check it out!</CAlert> */}
        <CToaster ref={toaster} push={toast} placement="top-end" />

        <CRow>
          <CCol className=" justify-content-end mb-4">
              <Link to={'/blog/add'}>
                <CButton>Add New Article</CButton>
              </Link>
          </CCol>
        </CRow>
        {
          list && (
            <>
              <CRow>
                <CCol xs>
                  <CCard className="mb-4">
                    <CCardHeader>Articles</CCardHeader>
                    <CCardBody>
                        <Table col={columns} dataa={filteredBlog} />
                    </CCardBody>
                  </CCard>
                </CCol>
            </CRow>
            </>
          )
        }
        {
          view && (
            <>
              <CCard className=' mb-5'>
                  <CCardHeader>{singlePost.title}</CCardHeader>
                  <CCardBody>
                      <CRow>
                        <CCol>
                          <h3 className=''>{singlePost.title}</h3>
                          <h4>{singlePost.subtitle}</h4>
                          <h5 className='text-muted mb-4'>{singlePost.author}</h5>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          {singlePost.body}
                        </CCol>
                      </CRow>
                  </CCardBody>
                  <CCardFooter>
                      <CRow>
                        <CCol>
                          <Link to={`/blog/${id}/edit`} className=' mr-5'>
                            <CButton className=''>Edit</CButton>
                          </Link>
                          <CButton className='' color="danger">Delete</CButton>
                        </CCol>
                      </CRow>
                  </CCardFooter>
              </CCard>
            </>
          )
        }
        {
          edit && (
            <>
            <CCard className=' mb-5'>
                <CCardHeader>{'Edit-'+ singlePost.title}</CCardHeader>
                  <CCardBody>
                      <CRow>
                        <CCol>
                          <CForm onSubmit={handleSubmit}>
                            <CFormInput
                              type="text"
                              id="exampleFormControlInput1"
                              label="Title"
                              text="Must be 8-20 characters long."
                              aria-describedby="exampleFormControlInputHelpInline"
                              value={title}
                              onChange={e => settitle(e.target.value)}
                              className=' mb-4'

                            />
                            <CFormInput
                              type="text"
                              id="exampleFormControlInput1"
                              label="Sub Title"
                              text="Must be 8-20 characters long."
                              aria-describedby="exampleFormControlInputHelpInline"
                              value={subtitle}
                              onChange={e => setSubtitle(e.target.value)}
                              className=' mb-4'
                            />
                            <CFormInput 
                              type="file"  
                              id="formFile" 
                              name='image' 
                              label="Default file input example"
                              value={postimage}
                              onChange={handleFileChange}
                              />
                            <Editor
                              apiKey='50wdqgqz88fpl68n52tmf8ilkr5udtv1jwcbcymq1f2xe9bo'
                              onInit={(evt, editor) => editorRef.current = editor}
                              initialValue={postbody}
                              value={postbody}
                              onEditorChange={e => setpostbody(e)}
                              init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                  'bold italic forecolor | alignleft aligncenter ' +
                                  'alignright alignjustify | bullist numlist outdent indent | ' +
                                  'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                              }}
                            />
                            <CButton className=' m-4 float-end' component="input" size="lg" type="submit" color="primary" value="Add New Post"/>
                          </CForm>
                        </CCol>
                      </CRow>
                  </CCardBody>
              </CCard>
            </>
          )
        }
        {
          add && (
            <>
            <CCard className=' mb-5'>
                <CCardHeader>{add ? 'Add New Article':'Edit-'+ singlePost.title}</CCardHeader>
                  <CCardBody>
                      <CRow>
                        <CCol>
                          <CForm onSubmit={add ? handlePostSubmit:handleSubmit}>
                            <CFormInput
                              type="text"
                              id="exampleFormControlInput1"
                              label="Title"
                              text="Must be 8-20 characters long."
                              aria-describedby="exampleFormControlInputHelpInline"
                              value={title}
                              onChange={e => settitle(e.target.value)}
                              className=' mb-4'

                            />
                            <CFormInput
                              type="text"
                              id="exampleFormControlInput1"
                              label="Sub Title"
                              text="Must be 8-20 characters long."
                              aria-describedby="exampleFormControlInputHelpInline"
                              value={subtitle}
                              onChange={e => setSubtitle(e.target.value)}
                              className=' mb-4'
                            />
                            <CFormInput 
                              type="file"  
                              id="formFile" 
                              name='image' 
                              // value={postimage}
                              onChange={handleFileChange}
                              className=' mb-4 none'

                              />
                            <CFormLabel for='formFile' className="file-upload mb-4">
                              <img src={postimage} name='image' alt="" srcset="" />
                            </CFormLabel>
                            <Editor
                              apiKey='50wdqgqz88fpl68n52tmf8ilkr5udtv1jwcbcymq1f2xe9bo'
                              // onInit={(evt, editor) => editorRef.current = editor}
                              // initialValue={postbody}
                              value={postbody}
                              onEditorChange={e => setpostbody(e.target.value)}
                              init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                  'bold italic forecolor | alignleft aligncenter ' +
                                  'alignright alignjustify | bullist numlist outdent indent | ' +
                                  'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                              }}
                            />
                            <CButton className=' m-4 float-end' component="input" size="lg" type="submit" color="primary" value="Update Post"/>
                          </CForm>
                        </CCol>
                      </CRow>
                  </CCardBody>
              </CCard>
            </>
          )
        }
    </>
  )
}

export default Blog