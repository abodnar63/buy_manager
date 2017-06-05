require "rails_helper"

RSpec.describe LabelsController, :type => :controller do
  describe "GET #index" do
    it "responds with 302 for not signed in users" do
      get :index
      expect(response).to have_http_status(302)
    end

    it "responds with 200 and returns user labels for signed in users" do
      user = FactoryGirl.create(:user)
      FactoryGirl.create_list(:label, 2, user: user)
      sign_in user
      get :index
      resp = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(resp.size).to eq(user.labels.size)
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

      it "returns 422 if label doesn't not exist" do
        get :show, id: 1
        expect(response).to have_http_status(422)
      end

      it "returns 422 if label doesn't not belong to user" do
        label = FactoryGirl.create(:label)
        get :show, id: label.id
        expect(response).to have_http_status(422)
      end

      it "returns 200 if label exists" do
        label = FactoryGirl.create(:label, user: @user)
        get :show, id: label.id
        resp = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(resp["id"]).to eq(label.id)
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

      it "creates new label and returns 200" do
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

      it "returns 422 if label doesn't not belong to user" do
        label = FactoryGirl.create(:label)
        put :update, name: "Test", id: label.id
        expect(response).to have_http_status(422)
      end

      it "returns 422 if label doesn't exist" do
        put :update, name: "Test", id: 1
        expect(response).to have_http_status(422)
      end

      it "returns 200 and updates label" do
        label = FactoryGirl.create(:label, user: @user)
        put :update, name: "Test label", id: label.id
        resp = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        expect(resp["name"]).to eq("Test label")
        expect(resp["id"]).to eq(label.id)
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

      it "returns 422 if label doesn't exist" do
        delete :destroy, id: 1
        expect(response).to have_http_status(422)
      end

      it "returns 422 if label doesn't not belong to user" do
        label = FactoryGirl.create(:label)
        delete :destroy, id: label.id
        expect(response).to have_http_status(422)
      end

      it "returns 200 and destroyes label" do
        label = FactoryGirl.create(:label, user: @user)
        expect do
          delete :destroy, id: label.id
        end.to change { @user.labels.count }.by(-1)
        expect(response).to have_http_status(200)
      end
    end
  end
end
