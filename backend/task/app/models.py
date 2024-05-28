from django.contrib.auth.models import User
from django.db import models


class Bank(models.Model):
    bank_name = models.CharField(max_length=100)
    routing_number = models.CharField(max_length=9, unique=True)
    swift_bic = models.CharField(max_length=11, unique=True)
    users = models.ManyToManyField(User, related_name="banks", blank=True)

    def __str__(self):
        return self.bank_name
