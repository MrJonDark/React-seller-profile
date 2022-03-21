import React, { Component } from 'react';

import imageas from '../../images/App Store.png';
import Demo from '../functions/resizing_function';
import 'font-awesome/css/font-awesome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faSignOutAlt,
  faTrash,
  faPlusCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { createStore } from '../../service/sellers';
import { Router, Redirect } from 'react-router-dom';
import { getCategoriesStores } from '../../service/Categories';
import auth from '../../service/users';
import Joi, { relative } from 'joi-browser';

import jwtEncode from 'jwt-encode';
export class CreateMarket extends Component {
  state = {
    errors: {},
    size: 1 / 1,
    image: imageas,
    store: {
      auth_id: sessionStorage.getItem('token'),
      name: '',
      phoneNumber: '',
      descriptionEn: '',
      descriptionAr: '',

      categoryId: '',
      userId: auth.getData().user.id,
      cashbackPercentage: '',
      logo: null,
      cover: null,
    },
    categories: [],
    index: 0,
    backGround: '',
    backGround2: '',
  };
  schema_store = {
    name: Joi.string().required().label('Name'),
    phoneNumber: Joi.number().required().label('phone Number'),
    descriptionEn: Joi.string().required().label('Enlish Description'),
    descriptionAr: Joi.string().required().label('Arabic Description'),
    categoryId: Joi.string().required().label('Category'),
    cashbackPercentage: Joi.string().required().label('Cashback Percentage'),
    userId: Joi.optional(),
    logo: Joi.optional(),
    cover: Joi.optional(),

    auth_id: Joi.optional(),
  };
  async componentDidMount() {
    this.setState({ categories: await getCategoriesStores() });
  }

  get_image = (src, selected_image, index) => {
    let store = { ...this.state.store };

    if (index == 0) {
      this.setState({
        store: { ...store, logo: src },
        backGround: src,
        image: null,
      });
    }
    if (index == 1) {
      this.setState({
        store: { ...store, cover: src },
        backGround2: src,
        image: null,
      });
    }
  };

  handle_logo = (e, title) => {
    const url = URL.createObjectURL(e.target.files[0]);
    if (e.target.files[0].size > 102400) {
      alert('Image too big (max 100kb)');
      return false;
    }
    let store = { ...this.state.store };

    this.setState({ image: url, index: 0, title: title, size: 1 / 1 });
    document.getElementById('upload_logo').click();
    e.target.value = '';
  };

  handle_cover = (e, title) => {
    const url = URL.createObjectURL(e.target.files[0]);
    if (e.target.files[0].size > 402400) {
      alert('Image too big (max 400kb)');
      return false;
    }
    this.setState(
      { image: url, index: 1, title: title, size: 18 / 5 },
      document.getElementById('upload_logo').click()
    );

    e.target.value = '';
  };

  changeValue = (e) => {
    const store = { ...this.state.store };

    const name = e.target.name;

    store[name] = e.currentTarget.value;
    this.setState({ store });
  };

  handle_submit = async (e) => {
    e.preventDefault();
    const store = this.state.store;
    this.setState({ store });
    const joi = Joi.validate(store, this.schema_store, { abortEarly: false });
    if (!joi.error) {
      document.getElementById('spinner-body').classList.remove('hide-spinner');

      try {
        const res = await createStore({ store });
        const data = {
          user: res.data.user,
          seller: JSON.parse(res.data.seller),
        };
        const secret = 'secret';

        sessionStorage.setItem('data', jwtEncode(data, secret));
        window.location = '/store';
      } catch (error) {}
      return;
    }
    const errors = {};

    for (let item of joi.error.details) errors[item.path[0]] = item.message;
    this.setState({ errors: errors }, () => {});
  };
  render() {
    if (auth.getData().seller) return <Redirect to='/store' />;
    const { errors } = this.state;
    return (
      <section id='section' style={{ width: '97%', margin: 'auto' }}>
        <div className=' spinner-body hide-spinner' id='spinner-body'>
          <div className='loader spinner'></div>
        </div>
        <form method='POST' onSubmit={this.handle_submit}>
          <div className='card w-100 pt-5  mr-auto mt-5'>
            <div className='row'>
              <div className='col-md-6 p-4 text-sm-center  pl-lg-5'>
                <h2 className='text-lg-left text-center font-weight-bold'>
                  Create Your Store
                </h2>

                <h6 className='text-lg-left text-center'>STORE DETAILS</h6>
                <div className='row'>
                  <div className='form-group col-12'>
                    <input
                      type='text'
                      className='form-control'
                      id='name'
                      placeholder='Store Name'
                      name='name'
                      value={this.state.store.name}
                      onChange={this.changeValue}
                    ></input>
                    {errors['name'] && (
                      <p className='text-danger col-12  mr-auto text-left'>
                        {errors['name']}
                      </p>
                    )}
                  </div>
                  <div className='form-group col-12'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Store description in English (optional)'
                      name='descriptionEn'
                      value={this.state.store.descriptionEn}
                      onChange={this.changeValue}
                    ></input>
                    {errors['descriptionEn'] && (
                      <p className='text-danger col-12  mr-auto text-left'>
                        {errors['descriptionEn']}
                      </p>
                    )}
                  </div>
                  <div className='form-group col-12'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Store description in Arabic (optional)'
                      name='descriptionAr'
                      value={this.state.store.descriptionAr}
                      onChange={this.changeValue}
                    ></input>
                    {errors['descriptionAr'] && (
                      <p className='text-danger col-12  mr-auto text-left'>
                        {errors['descriptionAr']}
                      </p>
                    )}
                  </div>
                  <div className='form-group col-lg-2 col-12'>
                    <select name='' className='form-control w-auto ' id=''>
                      <option value='+20'>+20</option>
                    </select>
                  </div>
                  <div className='form-group col-lg-6 col-12'>
                    <input
                      type='text'
                      className='form-control '
                      placeholder='Enter Number'
                      name='phoneNumber'
                      value={this.state.store.phoneNumber}
                      onChange={this.changeValue}
                    ></input>
                    {errors['phoneNumber'] && (
                      <p className='text-danger col-12  mr-auto text-left'>
                        {errors['phoneNumber']}
                      </p>
                    )}
                  </div>
                  <div className='form-group col-12 col-lg-5'>
                    <input
                      type='number'
                      className='form-control '
                      placeholder='Cashback amount (%)'
                      name='cashbackPercentage'
                      value={this.state.store.cashbackPercentage}
                      onChange={this.changeValue}
                      max='100'
                    ></input>
                    {errors['cashbackPercentage'] && (
                      <p className='text-danger col-12  mr-auto text-left'>
                        {errors['cashbackPercentage']}
                      </p>
                    )}
                  </div>
                  <div className='form-group col-12'>
                    <select
                      className='form-control w-auto'
                      name='categoryId'
                      value={this.state.store.categoryId}
                      onChange={this.changeValue}
                    >
                      <option>category</option>
                      {this.state.categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.attributes.name}
                        </option>
                      ))}
                    </select>
                    {errors['categoryId'] && (
                      <p className='text-danger col-12  mr-auto text-left'>
                        {errors['categoryId']}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className='col-md-6 border-left '>
                <h6 className='text-lg-left text-center pb-5'>
                  STOREFRONT DESIGN (optional)
                </h6>
                <div className='input_field w-75'>
                  <div
                    className={
                      this.state.backGround == ''
                        ? 'text-upload'
                        : 'edtingimageSection'
                    }
                  >
                    {this.state.backGround == '' ? (
                      <React.Fragment>
                        <p className='font-weight-bold'>
                          Drop your <strong>logo</strong> here or
                        </p>
                        <input
                          type='button'
                          className='input_main'
                          id='loadFileXml'
                          value='UPLOAD LOGO'
                          onClick={() => {
                            document.getElementById('file').click();
                          }}
                        />
                      </React.Fragment>
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => {
                          document.getElementById('file').click();
                        }}
                        icon={faPen}
                        className='edit_icon_cover '
                        style={{ right: '0', top: '0' }}
                      ></FontAwesomeIcon>
                    )}
                    <input
                      type='file'
                      className='d-none'
                      id='file'
                      directory='ture'
                      name='file'
                      onChange={(e) => this.handle_logo(e, 'UPLOAD LOGO')}
                    />
                  </div>
                  <div
                    className='image-upload'
                    style={{
                      background: `url("${this.state.backGround}") no-repeat center`,
                    }}
                  ></div>
                </div>

                <div className='input_field w-75'>
                  <div
                    className={
                      this.state.backGround2 == ''
                        ? 'text-upload'
                        : 'edtingimageSection'
                    }
                  >
                    {this.state.backGround2 == '' ? (
                      <React.Fragment>
                        <p className='font-weight-bold'>
                          Drop your <strong>Cover</strong> here or
                        </p>
                        <input
                          type='button'
                          className='input_main'
                          id='loadFileXml'
                          value='UPLOAD COVER'
                          onClick={() => {
                            document.getElementById('file2').click();
                          }}
                        />
                      </React.Fragment>
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => {
                          document.getElementById('file2').click();
                        }}
                        icon={faPen}
                        className='edit_icon_cover '
                        style={{ right: '0', top: '0' }}
                      ></FontAwesomeIcon>
                    )}{' '}
                    <input
                      type='file'
                      className='d-none'
                      id='file2'
                      name='file'
                      onChange={(e) => this.handle_cover(e, 'UPLOAD COVER')}
                    />
                  </div>
                  <div
                    className='image-upload'
                    style={{
                      background: `url("${this.state.backGround2}") no-repeat center`,
                    }}
                  ></div>
                </div>
              </div>
              <div className='col-12 text-md-right pl-4 pr-4  pb-4 text-sm-center'>
                <button className='input_main ' style={{ width: '250px' }}>
                  CREATE STORE
                </button>
              </div>
            </div>
          </div>
        </form>

        <input
          type='button'
          className='d-none'
          id='upload_logo'
          data-toggle='modal'
          data-target='#exampleModalCenter'
        ></input>
        <Demo
          url={this.state.image}
          size={this.state.size}
          title={this.state.title ?? ''}
          index={this.state.index}
          handle_close={this.get_image}
        />
      </section>
    );
  }
}
