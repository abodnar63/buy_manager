FactoryGirl.define do
  factory :label do
    sequence(:name) { |n| "Test label #{n}" }
    user
  end
end
