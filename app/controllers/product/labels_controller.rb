class Product::LabelsController < ApplicationController

  def create
    label = product.labels.build(label_params)
    if label.save
      render_success(label)
    else
      render_error(label.errors)
    end
  end

  def update
    label = product.labels.find_by_id(params[:id])
    if label.nil?
      render_error(label)
    else
      label.update(label_params)
      render_success(label)
    end
  end

  def destroy
    label = product.labels.find_by_id(params[:id])
    if label.nil?
      render_error(label)
    else
      label.destroy
      render_success(true)
    end
  end

  def index
    render_success(product.labels)
  end

  private

  def label_params
    obj = params.permit(:name)
    obj[:user_id] = current_user.id
    obj
  end

  def product
    Product.find(params[:product_id])
  end
end
