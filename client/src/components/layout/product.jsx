import React, { Component } from 'react';
import logo from '../../images/image_cropper_818C35D6-14B0-4042-8E77-7436E71C9D72-7478-0000053936F1CCC5.jpg';
import $ from 'jquery';
import Joi, { relative } from 'joi-browser';
import 'font-awesome/css/font-awesome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faSignOutAlt,
  faTrash,
  faPlusCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import Demo from '../functions/resizing_function';
import images from '../../images/Image Placeholder.png';
import {
  getProduct,
  getSizes,
  createProduct,
  EditProduct,
} from '../../service/Products';
import { getStocks } from '../../service/stocks';

import { getCategories, getCategory } from '../../service/Categories';
import Sizes from './Sizes';
import cover from '../../images/image_cropper_9BFB4C0F-5A38-4A0A-A2FE-F236FF90FA5C-7463-0000053704C3EB80 (1).jpg';
export class Product extends Component {
  state = {
    index: 0,
    errors: {},

    product: {
      nameEn: '',
      nameAr: '',
      descriptionEn: '',
      descriptionAr: '',
      priceCents: '',
      discountPriceCents: '',
      child_sub_category_en: '',
      genderCompatibility: '',
      mainImage: '',
      image: '',
      subImage1: '',
      subImage2: '',
      subImage3: '',
      subImage4: '',
      stocks: [],
    },

    sizes: [],
    categories: [],
  };
  schema_product = {
    nameEn: Joi.string().required().label('Engish Name'),
    nameAr: Joi.string().required().label('Arabic Name'),
    descriptionEn: Joi.string().required().label('Enlish Description'),
    descriptionAr: Joi.string().required().label('Arabic Description'),
    priceCents: Joi.number().required().label('Price'),
    discountPriceCents: Joi.optional(),
    child_sub_category_en: Joi.optional(),
    childSubCategoryId: Joi.optional(),
    genderCompatibility: Joi.optional(),
    mainImage: Joi.string().required().label('Main Image'),
    image: Joi.optional(),
    subImage1: Joi.optional(),
    subImage2: Joi.optional(),
    subImage3: Joi.optional(),
    subImage4: Joi.optional(),
    stocks: Joi.optional(),
    id: Joi.optional(),
    deleted_sub_images_ids: Joi.optional(),
  };
  async componentDidMount() {
    if (this.props.match.params.id) {
      try {
        const product = await getProduct(this.props.match.params.id);
        this.setState({
          product: {
            id: product.id,
            nameEn: product.attributes.name_en,
            nameAr: product.attributes.name_ar,
            descriptionEn: product.attributes.description_en,
            descriptionAr: product.attributes.description_ar,
            priceCents: product.attributes.price_cents,
            discountPriceCents: product.attributes.discount_price_cents,
            child_sub_category_en: product.attributes.child_sub_category_en,
            genderCompatibility: product.attributes.gender_compatibility,
            mainImage: product.attributes.image,
            image: { link: product.attributes.image },
            subImage1: product.attributes.sub_images[0]
              ? product.attributes.sub_images[0]
              : '',
            subImage2: product.attributes.sub_images[1]
              ? product.attributes.sub_images[1]
              : '',
            subImage3: product.attributes.sub_images[2]
              ? product.attributes.sub_images[2]
              : '',
            subImage4: product.attributes.sub_images[3]
              ? product.attributes.sub_images[3]
              : '',

            deleted_sub_images_ids: [],
          },
        });
      } catch (error) {
        this.props.history.push('/logout');
      }
    }
    this.setState({ categories: await getCategories() });
    this.setState({ sizes: await getSizes() });
  }
  get_image = (src, selected_image, index) => {
    let product = { ...this.state.product };
    let subImage1 = { ...this.state.product.subImage1 };
    let subImage2 = { ...this.state.product.subImage2 };
    let subImage3 = { ...this.state.product.subImage3 };
    let subImage4 = { ...this.state.product.subImage4 };

    switch (index) {
      case 0:
        this.setState({
          product: {
            ...product,
            image: { link: src, edited: true },
            mainImage: src,
          },
        });
        break;
      case 1:
        this.setState({
          product: {
            ...product,
            subImage1: { ...subImage1, link: src, edited: true },
          },
        });

        break;
      case 2:
        this.setState({
          product: {
            ...product,
            subImage2: { ...subImage2, link: src, edited: true },
          },
        });

        break;
      case 3:
        this.setState({
          product: {
            ...product,
            subImage3: { ...subImage3, link: src, edited: true },
          },
        });

        break;
      case 4:
        this.setState({
          product: {
            ...product,
            subImage4: { ...subImage4, link: src, edited: true },
          },
        });

        break;
      default:
    }
  };

  removeImage = (index, btn) => {
    document.getElementById(btn).style.display = 'none';

    let product = { ...this.state.product };
    let subImage1 = { ...this.state.product.subImage1 };
    let subImage2 = { ...this.state.product.subImage2 };
    let subImage3 = { ...this.state.product.subImage3 };
    let subImage4 = { ...this.state.product.subImage4 };
    switch (index) {
      case 0:
        this.setState({
          product: {
            ...product,
            subImage1: {
              ...subImage1,
              edited: false,
              link: images,
              removed: true,
            },
          },
        });

        break;
      case 1:
        this.setState({
          product: {
            ...product,
            subImage2: {
              ...subImage2,
              edited: false,
              link: images,
              removed: true,
            },
          },
        });

        break;
      case 2:
        this.setState({
          product: {
            ...product,
            subImage3: {
              ...subImage3,
              edited: false,
              link: images,
              removed: true,
            },
          },
        });

        break;
      case 3:
        this.setState({
          product: {
            ...product,
            subImage4: {
              ...subImage4,
              edited: false,
              link: images,
              removed: true,
            },
          },
        });

        break;

      default:
    }
  };

  handle_edit = () => {
    if ($('.profile_store').attr('readOnly')) {
      $('.profile_store').removeAttr('readOnly');
    } else {
      $('.profile_store').attr('readOnly', 'readOnly');
    }
    $('.profile_store').toggleClass('edit');
  };
  handle_logo = (e, btn) => {
    const url = URL.createObjectURL(e.target.files[0]);
    if (e.target.files[0].size > 1002400) {
      alert('Image too big (max 1000kb)');
      return false;
    }
    // document.getElementById(btn).style.display='block'

    document.getElementById('upload_logo').click();
    switch (e.target.id) {
      case 'file':
        this.setState({ index: 0 });

        break;
      case 'file1':
        this.setState({ index: 1 });

        break;
      case 'file2':
        this.setState({ index: 2 });
        break;
      case 'file3':
        this.setState({ index: 3 });
        break;
      case 'file4':
        this.setState({ index: 4 });
        break;
      default:
      // code block
    }
    this.setState({ selected_image: url });
    e.target.value = '';
  };

  add_items = () => {
    this.setState({
      product: {
        ...this.state.product,
        stocks: [...this.state.product.stocks, { size_id: '', quantity: 0 }],
      },
    });
  };

  delete_items = (index) => {
    const stock = this.state.product.stocks.filter((stock, i) => i !== index);
    //this.setState({ stocks: stock })
    this.setState({ product: { ...this.state.product, stocks: stock } });
  };
  geticonClasses() {
    let btnclass = 'm-2 ';
    btnclass += $('.items_size_single').length === 0 ? 'd-none' : '';
    return btnclass;
  }

  changeValue = (e) => {
    const product = { ...this.state.product };
    const name = e.target.name;
    product[name] = e.currentTarget.value;
    this.setState({ product });
  };
  changeValueStocks = (e, index) => {
    const product = { ...this.state.product };

    product['stocks'][index][e.target.name] = e.currentTarget.value;
    this.setState({ product });
  };
  handle_submit = async (e) => {
    e.preventDefault();
    let product = { ...this.state.product };

    let res = '';
    const joi = Joi.validate(product, this.schema_product, {
      abortEarly: false,
    });

    if (!joi.error) {
      document.getElementById('spinner-body').classList.remove('hide-spinner');

      if (this.props.match.params.id) res = await EditProduct({ product });
      else res = await createProduct({ product });

      window.location = '/products';
      return;
    }
    const errors = {};

    for (let item of joi.error.details) errors[item.path[0]] = item.message;
    this.setState({ errors: errors }, () => {});
  };

  render() {
    const { errors, product, categories, sizes } = this.state;
    const { match } = this.props;

    const filteredCategories = match.params.id
      ? categories.filter((cat) => cat.id != product.child_sub_category_id)
      : categories;
    return (
      <section className='mt-3 ml-auto mr-auto mt-4 p-4 mb-5 pb-5  w-75 '>
        <div className=' spinner-body hide-spinner' id='spinner-body'>
          <div className='loader spinner'></div>
        </div>
        <h2 className='mb-5 text-left font-weight-bold'>
          {match.params.id ? 'Edit Product ' + product.nameEn : 'Add Product'}
        </h2>

        <div className='card  card_background'>
          <form onSubmit={this.handle_submit} method='POST' className='p-5'>
            <div className='row'>
              <h6>PRODUCT DETAILS</h6>
              <div className='form-group col-12'>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  placeholder='Product name in English'
                  name='nameEn'
                  value={this.state.product.nameEn}
                  onChange={this.changeValue}
                ></input>
                {errors['nameEn'] && (
                  <p className='text-danger col-12  mr-auto text-left'>
                    {errors['nameEn']}
                  </p>
                )}
              </div>
              <div className='form-group col-12'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Product name in Arabic'
                  name='nameAr'
                  value={product.nameAr}
                  onChange={this.changeValue}
                ></input>
                {errors['nameAr'] && (
                  <p className='text-danger col-12  mr-auto text-left'>
                    {errors['nameEn']}
                  </p>
                )}
              </div>
              <div className='form-group col-12'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Product description in English'
                  name='descriptionEn'
                  value={product.descriptionEn}
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
                  placeholder='Product description in Arabic'
                  name='descriptionAr'
                  value={product.descriptionAr}
                  onChange={this.changeValue}
                ></input>
                {errors['descriptionAr'] && (
                  <p className='text-danger col-12  mr-auto text-left'>
                    {errors['descriptionAr']}
                  </p>
                )}
              </div>
              <div className='form-group col-lg-6 col-md-6 col-12'>
                <input
                  type='text'
                  className='form-control w-lg-75 w-md-75 '
                  placeholder='Price'
                  name='priceCents'
                  value={product.priceCents}
                  onChange={this.changeValue}
                ></input>
                {errors['priceCents'] && (
                  <p className='text-danger col-12  mr-auto text-left'>
                    {errors['priceCents']}
                  </p>
                )}
              </div>
              <div className='form-group col-lg-4 col-md-4 col-12'>
                <input
                  type='text'
                  className='form-control '
                  placeholder='Discounted price (if any)'
                  name='discountPriceCents'
                  value={product.discountPriceCents}
                  onChange={this.changeValue}
                ></input>
              </div>
              <div className='form-group col-12'>
                {product.child_sub_category_en ? (
                  <select
                    name='childSubCategoryId'
                    disabled={product.child_sub_category_en && 'disabled'}
                    onChange={this.changeValue}
                    className='form-control w-auto '
                    id=''
                  >
                    <option>{product.child_sub_category_en}</option>
                  </select>
                ) : (
                  <select
                    name='childSubCategoryId'
                    disabled={product.child_sub_category_en && 'disabled'}
                    onChange={this.changeValue}
                    className='form-control w-auto '
                    id=''
                  >
                    <option value='test'>Sub-Category</option>

                    {filteredCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.attributes.name_en}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className='form-group col-12'>
                <select
                  value={`${product.genderCompatibility}`}
                  name='genderCompatibility'
                  onChange={this.changeValue}
                  className='form-control w-auto '
                  id=''
                >
                  <option value='test2'>Gender</option>
                  <option value='any'>Any</option>
                  <option value='female'>Female</option>
                  <option value='male'>Male</option>
                </select>
              </div>
            </div>

            <hr />

            <div className='p-lg-4 pl-lg-5 p-md-4 pl-md-5'>
              <div>
                <h5 className='text-left pb-5'>PRODUCT IMAGES</h5>

                <div className='d-lg-flex d-md-flex mb-5'>
                  <p className='col-lg-2 text-center font-weight-light text-lg-left col-md-12 col-12'>
                    Main Image
                  </p>
                  <div className='subImages m-lg-0 m-auto '>
                    {this.state.product.image && (
                      <span
                        className='mainImage'
                        onClick={() => document.getElementById('file').click()}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}

                    <img
                      width='100%'
                      height='120px'
                      src={
                        this.state.product.image
                          ? this.state.product.image.link
                          : images
                      }
                      className='cursor-pointer images'
                      onClick={() => {
                        document.getElementById('file').click();
                      }}
                      alt=''
                    />
                    <input
                      type='file'
                      className='d-none'
                      id='file'
                      directory='ture'
                      name='image'
                      onChange={(e) => this.handle_logo(e)}
                    />
                  </div>
                  <br />
                </div>
                {errors['mainImage'] && (
                  <p className='text-danger col-12  mr-auto text-left'>
                    {errors['mainImage']}
                  </p>
                )}

                <div className='row'>
                  <div className='col-lg-2 text-center text-lg-left col-md-12 col-12'>
                    <p className=' m-auto m-lg-0 font-weight-light'>
                      Sub-Images
                      <br />
                      (optional)
                    </p>
                  </div>

                  <div className='subImages col-lg-2 p-0 col-md-4 col-12'>
                    <div className='subImage_dev '>
                      {this.state.product.subImage1 ? (
                        <span
                          id='imageRemove0'
                          onClick={() => {
                            this.removeImage(0, 'imageRemove0');
                          }}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </span>
                      ) : (
                        ''
                      )}
                      <img
                        width='100%'
                        height='120px'
                        src={
                          this.state.product.subImage1
                            ? this.state.product.subImage1.link
                            : images
                        }
                        id='image1'
                        className='m-2 cursor-pointer images '
                        onClick={() => {
                          document.getElementById('file1').click();
                        }}
                        alt=''
                      />
                      <input
                        type='file'
                        className='d-none'
                        id='file1'
                        directory='ture'
                        name='subImage1'
                        onChange={(e) => this.handle_logo(e, 'image0')}
                      />
                    </div>
                  </div>
                  <div className='subImages col-lg-2 p-0 col-md-4 col-12'>
                    <div className='subImage_dev'>
                      {this.state.product.subImage2 ? (
                        <span
                          id='imageRemove1'
                          onClick={() => this.removeImage(1, 'imageRemove1')}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </span>
                      ) : (
                        ''
                      )}
                      <img
                        width='100%'
                        height='120px'
                        src={
                          this.state.product.subImage2
                            ? this.state.product.subImage2.link
                            : images
                        }
                        id='image2'
                        className='m-2 cursor-pointer '
                        onClick={() => {
                          document.getElementById('file2').click();
                        }}
                        alt=''
                      />
                      <input
                        type='file'
                        className='d-none'
                        id='file2'
                        directory='ture'
                        name='subImage2'
                        onChange={(e) => this.handle_logo(e, 'image1')}
                      />
                    </div>
                  </div>

                  <div className='subImages col-lg-2 p-0 col-md-4 col-12'>
                    <div className='subImage_dev'>
                      {this.state.product.subImage3 ? (
                        <span
                          id='imageRemove2'
                          onClick={() => this.removeImage(2, 'imageRemove2')}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </span>
                      ) : (
                        ''
                      )}

                      <img
                        width='100%'
                        height='120px'
                        src={
                          this.state.product.subImage3
                            ? this.state.product.subImage3.link
                            : images
                        }
                        id='image3'
                        className='m-2 cursor-pointer images '
                        onClick={() => {
                          document.getElementById('file3').click();
                        }}
                        alt=''
                      />
                      <input
                        type='file'
                        className='d-none'
                        id='file3'
                        directory='ture'
                        name='subImage3'
                        onChange={(e) => this.handle_logo(e, 'image2')}
                      />
                    </div>
                  </div>
                  <div className='subImages col-lg-2 p-0 col-md-4 col-12'>
                    <div className='subImage_dev'>
                      {this.state.product.subImage4 ? (
                        <span
                          id='imageRemove3'
                          onClick={() => this.removeImage(3, 'imageRemove3')}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </span>
                      ) : (
                        ''
                      )}
                      <img
                        width='100%'
                        height='120px'
                        src={
                          this.state.product.subImage4
                            ? this.state.product.subImage4.link
                            : images
                        }
                        id='image4'
                        className='m-2 cursor-pointer images '
                        onClick={() => {
                          document.getElementById('file4').click();
                        }}
                        alt=''
                      />
                      <input
                        type='file'
                        className='d-none'
                        id='file4'
                        directory='ture'
                        name='subImage4'
                        onChange={(e) => this.handle_logo(e, 'image3')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />

            {!this.props.match.params.id && (
              <div className='p-lg-4  pl-lg-5 p-md-4  pl-md-5 items_size'>
                <h5 className='text-left pb-5'>STOCK DETAILS</h5>

                {product.stocks.length == 0 ? (
                  <h5>There is no stocks in this product</h5>
                ) : (
                  product.stocks.map((stock, index) => (
                    <div
                      key={index}
                      className='row align-items-center items_size_single '
                    >
                      <div className='col-lg-2 col-12 mb-2'>
                        <select
                          required
                          className='form-control'
                          name='size_id'
                          onChange={(e, number) =>
                            this.changeValueStocks(e, index)
                          }
                        >
                          <option value=''>Size</option>
                          {sizes.map((size) => (
                            <option key={size.id} value={size.id}>
                              {size.attributes.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='col-lg-2 col-12'>
                        <input
                          type='text'
                          className='form-control '
                          placeholder='Quantity'
                          name='quantity'
                          value={stock.quantity}
                          onChange={(e, number) =>
                            this.changeValueStocks(e, index)
                          }
                          required
                        ></input>
                      </div>
                      <button
                        type='button'
                        className='remove_item btn'
                        onClick={() => this.delete_items(index)}
                      >
                        <FontAwesomeIcon className='m-2' icon={faTrash} />
                      </button>
                    </div>
                  ))
                )}

                <button
                  type='button'
                  className='add_item'
                  onClick={this.add_items}
                >
                  + Add Stock{' '}
                </button>
              </div>
            )}
            <input
              type='submit'
              value={
                this.props.match.params.id
                  ? 'Update Product'
                  : 'Add new product'
              }
              className=' ml-lg-auto ml-md-auto ml-0   d-block input_main w-lg-25'
            />
          </form>

          {this.props.match.params.id && (
            <Sizes
              product={product.id}
              stocks={getStocks(this.props.match.params.id)}
              add_items={this.add_items}
              delete_items={this.delete_items}
              changeValueStocks={this.changeValueStocks}
              sizes={sizes}
            />
          )}
        </div>

        <Demo
          url={this.state.selected_image}
          index={this.state.index}
          handle_close={this.get_image}
        />

        <input
          type='button'
          className='d-none'
          id='upload_logo'
          data-toggle='modal'
          data-target='#exampleModalCenter'
        ></input>
      </section>
    );
  }
}

export default Product;
