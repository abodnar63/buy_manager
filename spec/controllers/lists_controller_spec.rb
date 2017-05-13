require "rails_helper"

RSpec.describe ListsController, :type => :controller do
  describe "GET #index" do
    it "responds with 302 for not signed in users" do
      get :index
      expect(response).to have_http_status(302)
    end

    it "responds with 200 and returns user lists for signed in users" do
      user = FactoryGirl.create(:user)
      sign_in user
      get :index
      expect(response).to have_http_status(200)
    end
  end

  describe "GET #show" do
    context "for not signed in users" do
      it "responds with 302 " do
        get :show, id: 1
        expect(response).to have_http_status(302)
      end
    end

    context "for signed in users" do
      before do
        @user = FactoryGirl.create(:user)
        sign_in @user
      end

      it "returns 422 if list doesn't not exist" do
        get :show, id: 1
        expect(response).to have_http_status(422)
      end

      it "returns 422 if list doesn't not belong to user" do
        list = FactoryGirl.create(:list)
        get :show, id: list.id
        expect(response).to have_http_status(422)
      end

      it "returns 200 if list exists" do
        list = FactoryGirl.create(:list, user: @user)
        get :show, id: list.id
        resp = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(resp["id"]).to eq(list.id)
      end
    end
  end

  describe "POST #create" do
    context "for not signed in users" do
      it "responds with 302 " do
        post :create, id: 1
        expect(response).to have_http_status(302)
      end
    end

    context "for signed in users" do
      before do
        @user = FactoryGirl.create(:user)
        sign_in @user
      end

      it "returns 422 if name is not set" do
        post :create
        expect(response).to have_http_status(422)
      end

      it "creates new list and returns 200" do
        post :create, name: "Test"
        resp = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(resp["name"]).to eq("Test")
      end
    end
  end

  describe "PUT #update" do
    context "for not signed in users" do
      it "responds with 302 " do
        put :update, name: "Test", id: 1
        expect(response).to have_http_status(302)
      end
    end

    context "for signed in users" do
      before do
        @user = FactoryGirl.create(:user)
        sign_in @user
      end

      it "returns 422 if list doesn't not belong to user" do
        list = FactoryGirl.create(:list)
        put :update, name: "Test", id: list.id
        expect(response).to have_http_status(422)
      end

      it "returns 422 if list doesn't exist" do
        put :update, name: "Test", id: 1
        expect(response).to have_http_status(422)
      end

      it "returns 200 and updates list" do
        list = FactoryGirl.create(:list, user: @user)
        put :update, name: "Test List", id: list.id
        resp = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(resp["name"]).to eq("Test List")
        expect(resp["id"]).to eq(list.id)
      end
    end
  end

  describe "DELETE #destroy" do
    context "for not signed in users" do
      it "responds with 302 " do
        delete :destroy, id: 1
        expect(response).to have_http_status(302)
      end
    end

    context "for signed in users" do
      before do
        @user = FactoryGirl.create(:user)
        sign_in @user
      end

      it "returns 422 if list doesn't exist" do
        delete :destroy, id: 1
        expect(response).to have_http_status(422)
      end

      it "returns 422 if list doesn't not belong to user" do
        list = FactoryGirl.create(:list)
        delete :destroy, id: list.id
        expect(response).to have_http_status(422)
      end

      it "returns 200 and destroyes list" do
        list = FactoryGirl.create(:list, user: @user)
        expect do
          delete :destroy, id: list.id
        end.to change { @user.lists.count }.by(-1)
        expect(response).to have_http_status(200)
      end
    end
  end
end
