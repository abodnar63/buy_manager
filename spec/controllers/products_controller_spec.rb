require "rails_helper"

RSpec.describe ProductsController, :type => :controller do
  describe "GET #index" do
    it "responds with 302 for not signed in users" do
      get :index
      expect(response).to have_http_status(302)
    end

    it "responds with 200 and returns user products for signed in users" do
      user = FactoryGirl.create(:user)
      FactoryGirl.create_list(:product, 2, user: user)
      sign_in user
      get :index
      resp = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(resp.size).to eq(user.products.size)
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

      it "returns 422 if product doesn't not exist" do
        get :show, id: 1
        expect(response).to have_http_status(422)
      end

      it "returns 422 if product doesn't not belong to user" do
        product = FactoryGirl.create(:product)
        get :show, id: product.id
        expect(response).to have_http_status(422)
      end

      it "returns 200 if product exists" do
        product = FactoryGirl.create(:product, user: @user)
        get :show, id: product.id
        resp = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(resp["id"]).to eq(product.id)
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

      it "creates new product and returns 200" do
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

      it "returns 422 if product doesn't not belong to user" do
        product = FactoryGirl.create(:product)
        put :update, name: "Test", id: product.id
        expect(response).to have_http_status(422)
      end

      it "returns 422 if product doesn't exist" do
        put :update, name: "Test", id: 1
        expect(response).to have_http_status(422)
      end

      it "returns 200 and updates product" do
        product = FactoryGirl.create(:product, user: @user)
        put :update, name: "Test product", id: product.id
        resp = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(resp["name"]).to eq("Test product")
        expect(resp["id"]).to eq(product.id)
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

      it "returns 422 if product doesn't exist" do
        delete :destroy, id: 1
        expect(response).to have_http_status(422)
      end

      it "returns 422 if product doesn't not belong to user" do
        product = FactoryGirl.create(:product)
        delete :destroy, id: product.id
        expect(response).to have_http_status(422)
      end

      it "returns 200 and destroyes product" do
        product = FactoryGirl.create(:product, user: @user)
        expect do
          delete :destroy, id: product.id
        end.to change { @user.products.count }.by(-1)
        expect(response).to have_http_status(200)
      end
    end
  end
end
