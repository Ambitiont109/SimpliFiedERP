import pytest
from django.urls import reverse
import json
from model_bakery import baker

from utils import is_subset_dict
from .models import Item

pytestmark = pytest.mark.django_db


class TestItemsAPI:
    endpoint = reverse("item-list")

    def test_list(self, authenticated_client):
        baker.make(Item, _quantity=3)

        response = authenticated_client.get(
            self.endpoint
        )
        assert response.status_code == 200
        assert len(json.loads(response.content)['results']) == 3

    def test_create(self, authenticated_client):
        item = baker.prepare(Item)
        expected_json = {
            'name': item.name,
            'quantity': item.quantity,
            'location': item.location
        }

        response = authenticated_client.post(
            self.endpoint,
            data=expected_json,
            format='json'
        )

        assert response.status_code == 201
        print(json.loads(response.content), expected_json)
        assert is_subset_dict(json.loads(response.content), expected_json)

    def test_retrieve(self, authenticated_client):
        item = baker.make(Item)
        expected_json = {
            'name': item.name,
            'quantity': item.quantity,
            'location': item.location
        }
        url = f'{self.endpoint}{item.id}/'

        response = authenticated_client.get(url)

        assert response.status_code == 200
        assert is_subset_dict(json.loads(response.content), expected_json)

    def test_update(self, authenticated_client):
        old_item = baker.make(Item)
        new_item = baker.prepare(Item)
        item_dict = {
            'quantity': new_item.quantity,
            'name': new_item.name,
            'location': new_item.location
        }

        url = f'{self.endpoint}{old_item.id}/'

        response = authenticated_client.put(
            url,
            item_dict,
            format='json'
        )

        assert response.status_code == 200
        assert is_subset_dict(json.loads(response.content), item_dict)

    @pytest.mark.parametrize('field', ['quantity', 'name', 'location'])
    def test_partial_update(self, field, authenticated_client):
        item = baker.make(Item)
        item_dict = {
            'quantity': item.quantity,
            'name': item.name,
            'location': item.location
        }
        valid_field = item_dict[field]
        url = f'{self.endpoint}{item.id}/'

        response = authenticated_client.patch(
            url,
            {field: valid_field},
            format='json'
        )

        assert response.status_code == 200
        assert json.loads(response.content)[field] == valid_field

    def test_delete(self, authenticated_client):
        item = baker.make(Item)
        url = f'{self.endpoint}{item.id}/'

        response = authenticated_client.delete(url)

        assert response.status_code == 204
        assert Item.objects.all().count() == 0

    def test_pagination(self, authenticated_client, pagination_page_size):
        baker.make(Item, _quantity=pagination_page_size * 2)
        response = authenticated_client.get(
            self.endpoint
        )
        assert response.status_code == 200
        response_data = json.loads(response.content)
        assert response_data['count'] == pagination_page_size * 2
        assert len(response_data['results']) == pagination_page_size

    def test_complex_filtering(self, authenticated_client):
        baker.make(Item, quantity=25, name="T-Shirts")
        baker.make(Item, quantity=15, name="Jeans")
        baker.make(Item, quantity=10, name="Dresses")
        baker.make(Item, quantity=20, name="Sweaters")
        baker.make(Item, quantity=30, name="Running Shoes")
        baker.make(Item, quantity=11, name="Oxford Shoes")
        baker.make(Item, quantity=16, name="Athletic Shoes")
        baker.make(Item, quantity=17, name="Boat Shoes")
        baker.make(Item, quantity=50, name="Socks")
        baker.make(Item, quantity=12, name="Jackets")
        response = authenticated_client.get(
            f'{self.endpoint}?search=shoes&ordering=quantity&quantity__gte=16'
        )
        assert response.status_code == 200
        response_data = json.loads(response.content)
        assert response_data['count'] == 3
        assert response_data['results'][0]['name'] == "Athletic Shoes"


