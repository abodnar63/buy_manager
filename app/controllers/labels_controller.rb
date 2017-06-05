class LabelsController < ApplicationController

  def create
    label = current_user.labels.build(label_params)
    if label.save
      render_success(label)
    else
      render_error(label.errors)
    end
  end

  def update
    label = current_user.labels.find_by_id(params[:id])
    if label.nil?
      render_error(label)
    else
      label.update(label_params)
      render_success(label)
    end
  end

  def destroy
    label = current_user.labels.find_by_id(params[:id])
    if label.nil?
      render_error(label)
    else
      label.destroy
      render_success(true)
    end
  end

  def index
    render_success(current_user.labels)
  end

  def show
    label = current_user.labels.find_by_id(params[:id])
    if label.nil?
      render_error(false)
    else
      render_success(label)
    end
  end

  private

  def label_params
    params.permit(:name)
  end
end
