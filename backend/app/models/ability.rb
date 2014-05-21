class Ability
  include CanCan::Ability

  def initialize(user)
    #return unless user

    can :manage, Job, user_id: user.id
    can :manage, Resume, job: { user_id: user.id }
  end
end
