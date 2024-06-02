from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Bank


class BankTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.bank = Bank.objects.create(
            bank_name="Test Bank", routing_number="123456789", swift_bic="ABCDEFGH"
        )
        self.bank.users.add(self.user)

    def test_create_bank(self):
        url = reverse("bank-list")
        data = {
            "bank_name": "New Bank",
            "routing_number": "987654321",
            "swift_bic": "HGFEDCBA",
            "users": [self.user.id],
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_bank_list(self):
        url = reverse("bank-list")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_bank_detail(self):
        url = reverse("bank-detail", args=[self.bank.id])
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["bank_name"], self.bank.bank_name)

    def test_delete_bank_with_users(self):
        url = reverse("bank-detail", args=[self.bank.id])
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_bank_without_users(self):
        self.bank.users.clear()
        url = reverse("bank-detail", args=[self.bank.id])
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
