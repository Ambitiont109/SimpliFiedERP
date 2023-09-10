import pytest
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token


@pytest.fixture
def auth_token():
    from django.contrib.auth.models import User
    test_user, _ = User.objects.get_or_create(username="testuser", password="testpassword")
    token, _ = Token.objects.get_or_create(user=test_user)
    return token.key


@pytest.fixture
def authenticated_client(auth_token):
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f'Token {auth_token}')
    return client


@pytest.fixture
def pagination_page_size():
    from django.conf import settings
    return settings.REST_FRAMEWORK['PAGE_SIZE']
