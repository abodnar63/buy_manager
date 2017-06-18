class Product::LabelsController < ApplicationController

  def create
    label = product.labels.build(label_params)
    if label.save
      product.labels << label
      render_success(label)
    else
      render_error(label.errors)
    end
  end

  def destroy
    label = Label.find_by_id(params[:id])
    if label.nil?
      render_error(label)
    else
      product.labels.delete(label)
      render_success(true)
    end
  end

  def index
    render_success(product.labels)
  end

  def other_labels
    ids = Label.includes(:labels_products).where(labels_products: {product_id: params[:product_id]}).map(&:id)
    render_success(Label.where.not(id: ids))
  end

  def add_labels
    product.labels << get_labels
    render_success(true)
  end

  private

  def get_labels
    data = JSON.parse(params[:labels])
    Label.where(id: data)
  end

  def label_params
    obj = params.permit(:name)
    obj[:user_id] = current_user.id
    obj
  end

  def product
    Product.find(params[:product_id])
  end
end
