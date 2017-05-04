class ListsController < ApplicationController

  def create
    list = current_user.lists.build(list_params)
    if list.save
      render_success(list)
    else
      render_error(list.errors)
    end
  end

  def update
    list = current_user.lists.find_by_id(params[:id])
    if list.nil?
      render_error(list)
    else
      list.update(list_params)
      render_success(list)
    end
  end

  def destroy
    list = current_user.lists.find_by_id(params[:id])
    if list.nil?
      render_error(list)
    else
      list.destroy
      render_success(true)
    end
  end

  def index
    render_success(current_user.lists)
  end

  def show
    list = current_user.lists.find_by_id(params[:id])
    if list.nil?
      render_error(false)
    else
      render_success(list)
    end
  end

  private

  def list_params
    params.permit(:name)
  end
end
