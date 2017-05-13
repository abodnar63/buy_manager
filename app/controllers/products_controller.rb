class ProductsController < ApplicationController
  def create
    product = current_user.products.build(product_params)
    if product.save
      render_success(product)
    else
      render_error(product.errors)
    end
  end

  def update
    product = current_user.products.find_by_id(params[:id])
    if product.nil?
      render_error(product)
    else
      product.update(product_params)
      render_success(product)
    end
  end

  def destroy
    product = current_user.products.find_by_id(params[:id])
    if product.nil?
      render_error(product)
    else
      product.destroy
      render_success(true)
    end
  end

  def index
    render_success(current_user.products)
  end

  def show
    product = current_user.products.find_by_id(params[:id])
    if product.nil?
      render_error(false)
    else
      render_success(product)
    end
  end

  private

  def product_params
    params.permit(:name)
  end
end
