# Generated by Django 5.1.2 on 2025-03-17 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bats', '0004_rename_images_bat_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bat',
            name='image',
            field=models.ImageField(blank=True, default='default.png', null=True, upload_to='bats/images/uploads/'),
        ),
        migrations.AlterField(
            model_name='batgallery',
            name='image',
            field=models.ImageField(max_length=255, upload_to='bats/images/Bats/'),
        ),
    ]
