# Generated by Django 5.1.2 on 2025-02-28 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0004_cart_remarks'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='delivery_date',
            field=models.DateField(blank=True, null=True, verbose_name='Delivery Date'),
        ),
    ]
