require "rails_helper"

RSpec.describe Product::LabelsController, :type => :controller do
  describe "GET #index" do
    let(:user) { FactoryGirl.create(:user) }
    let(:product) { FactoryGirl.create(:product, user: user) }

    it "responds with 302 for not signed in users" do
      get :index, product_id: product.id
      expect(response).to have_http_status(302)
    end

    it "responds with 200 and returns product labels for signed in users" do
      sign_in user
      FactoryGirl.create_list(:label, 2, product: product, user: user)
      get :index, product_id: product.id
      resp = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(resp.size).to eq(product.labels.size)
    end
  end

  describe "POST #create" do
    let(:user) { FactoryGirl.create(:user) }
    let(:product) { FactoryGirl.create(:product, user: user) }

    context "for not signed in users" do
      it "responds with 302 " do
        post :create, product_id: product.id
        expect(response).to have_http_status(302)
      end
    end

    context "for signed in users" do
      before do
        sign_in user
      end

      it "returns 422 if name is not set" do
        post :create, product_id: product.id
        expect(response).to have_http_status(422)
      end

      it "creates new label and returns 200" do
        post :create, name: "Test", product_id: product.id
        resp = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(resp["name"]).to eq("Test")
      end
    end
  end

  describe "PUT #update" do
    let(:user) { FactoryGirl.create(:user) }
    let(:product) { FactoryGirl.create(:product, user: user) }

    context "for not signed in users" do
      it "responds with 302 " do
        put :update, name: "Test", id: 1, product_id: product.id
        expect(response).to have_http_status(302)
      end
    end

    context "for signed in users" do
      before do
        sign_in user
      end

      it "returns 422 if label doesn't exist" do
        put :update, name: "Test", id: 1, product_id: product.id
        expect(response).to have_http_status(422)
      end

      it "returns 200 and updates label" do
        label = FactoryGirl.create(:label, product: product, user: user)
        put :update, name: "Test Label", id: label.id, product_id: product.id
        resp = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(resp["name"]).to eq("Test Label")
        expect(resp["id"]).to eq(label.id)
      end
    end
  end

  describe "DELETE #destroy" do
    let(:user) { FactoryGirl.create(:user) }
    let(:product) { FactoryGirl.create(:product, user: user) }

    context "for not signed in users" do
      it "responds with 302 " do
        delete :destroy, id: 1, product_id: product.id
        expect(response).to have_http_status(302)
      end
    end

    context "for signed in users" do
      before do
        sign_in user
      end

      it "returns 422 if label doesn't exist" do
        delete :destroy, id: 1, product_id: product.id
        expect(response).to have_http_status(422)
      end

      it "returns 200 and destroyes label" do
        label = FactoryGirl.create(:label, product: product)
        expect do
          delete :destroy, id: label.id, product_id: product.id
        end.to change { product.labels.count }.by(-1)
        expect(response).to have_http_status(200)
      end
    end
  end
end
