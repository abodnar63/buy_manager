FactoryGirl.define do
  factory :user do
    sequence(:email) { "test_email#{SecureRandom.hex(8)}@example.com" }
    password { SecureRandom.hex(8) }
  end
end
