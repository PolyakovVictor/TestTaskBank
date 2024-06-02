from django.contrib.auth.models import User
from django.db import models


class Bank(models.Model):
    bank_name = models.CharField(max_length=255)
    routing_number = models.CharField(max_length=255)
    swift_bic = models.CharField(max_length=255)
    users = models.ManyToManyField(User, related_name="banks")

    def __str__(self):
        return self.bank_name
