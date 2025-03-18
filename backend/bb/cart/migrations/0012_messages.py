# Generated by Django 5.1.2 on 2025-03-13 16:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0011_remove_cart_delivery_date_cartitem_delivery_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Messages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=30, null=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phone', models.CharField(blank=True, max_length=15, null=True)),
                ('message', models.TextField(blank=True, max_length=500, null=True)),
            ],
        ),
    ]
