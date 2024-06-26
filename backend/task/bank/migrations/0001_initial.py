# Generated by Django 5.0.6 on 2024-06-01 12:27

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Bank',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bank_name', models.CharField(max_length=255)),
                ('routing_number', models.CharField(max_length=255)),
                ('swift_bic', models.CharField(max_length=255)),
                ('users', models.ManyToManyField(related_name='banks', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
